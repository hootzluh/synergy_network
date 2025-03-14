#!/usr/bin/env python3
"""
Command Line Interface for Synergy Network Utility

This module provides a command-line interface for the Synergy Network
wallet, token, and naming system utility.
"""

import os
import sys
import cmd
import argparse
import getpass
import json
import time
from typing import Dict, List, Any, Optional, Tuple

# Add parent directory to path to import from other packages
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from utility.common.config import get_config
from utility.core.wallet import Wallet, WalletManager
from utility.core.token import Token, TokenManager, TokenType, TokenPermission, TokenTransaction
from utility.core.naming import Domain, NamingSystem, DomainStatus, NamingTransaction

class SynergyUtilityCLI(cmd.Cmd):
    """Synergy Network Utility CLI"""

    intro = """
    ┌─────────────────────────────────────────────────────┐
    │                                                     │
    │  Synergy Network Utility - Command Line Interface   │
    │                                                     │
    │  Type 'help' or '?' to list commands.              │
    │  Type 'exit' or 'quit' to exit.                    │
    │                                                     │
    └─────────────────────────────────────────────────────┘
    """
    prompt = "synergy> "

    def __init__(self):
        """Initialize the CLI."""
        super().__init__()

        # Initialize components
        self.config = get_config()
        self.wallet_manager = WalletManager()
        self.token_manager = TokenManager()
        self.naming_system = NamingSystem()

        # Set active wallet
        self.active_wallet = self.wallet_manager.get_default_wallet()

        # Update prompt if active wallet
        if self.active_wallet:
            self.prompt = f"synergy ({self.active_wallet.name})> "

    # General commands

    def do_exit(self, arg):
        """Exit the program."""
        print("Goodbye!")
        return True

    def do_quit(self, arg):
        """Exit the program."""
        return self.do_exit(arg)

    def do_config(self, arg):
        """
        View or modify configuration.

        Usage:
          config show
          config set <key> <value>
          config reset
        """
        args = arg.split()

        if not args:
            print("Error: Missing subcommand")
            return

        subcommand = args[0]

        if subcommand == "show":
            # Show configuration
            print("\nConfiguration:")
            print(f"  Active network: {self.config.get('network.active_network')}")
            active_network = self.config.get_active_network()
            print(f"  RPC endpoint: {active_network.get('rpc_endpoint')}")
            print(f"  Explorer endpoint: {active_network.get('explorer_endpoint')}")
            print(f"  Chain ID: {active_network.get('chain_id')}")
            print(f"  Keystore path: {self.config.get_keystore_path()}")
            print(f"  Default wallet: {self.config.get('wallet.default_wallet')}")
            print(f"  UI theme: {self.config.get('ui.theme')}")
            print(f"  Language: {self.config.get('ui.language')}")

        elif subcommand == "set":
            # Set configuration value
            if len(args) < 3:
                print("Error: Missing key or value")
                return

            key = args[1]
            value = args[2]

            # Handle special cases
            if key == "network.active_network" and value not in ["mainnet", "testnet", "local"]:
                print(f"Error: Invalid network: {value}")
                return

            # Set the value
            success = self.config.set(key, value)

            if success:
                print(f"Configuration updated: {key} = {value}")
            else:
                print(f"Error: Failed to update configuration")

        elif subcommand == "reset":
            # Reset configuration to defaults
            success = self.config.reset_to_defaults()

            if success:
                print("Configuration reset to defaults")
            else:
                print("Error: Failed to reset configuration")

        else:
            print(f"Error: Unknown subcommand: {subcommand}")

    # Wallet commands

    def do_wallet(self, arg):
        """
        Manage wallets.

        Usage:
          wallet list
          wallet create <name>
          wallet import <name> <private_key>
          wallet import_mnemonic <name> <mnemonic>
          wallet export <address>
          wallet export_mnemonic <address>
          wallet show [address]
          wallet set_default <address>
          wallet rename <address> <new_name>
          wallet delete <address>
        """
        args = arg.split()

        if not args:
            print("Error: Missing subcommand")
            return

        subcommand = args[0]

        if subcommand == "list":
            # List wallets
            wallets = self.wallet_manager.get_wallets()

            if not wallets:
                print("No wallets found")
                return

            print("\nWallets:")
            for wallet in wallets:
                default_marker = " (default)" if wallet.address == self.config.get('wallet.default_wallet') else ""
                active_marker = " (active)" if self.active_wallet and wallet.address == self.active_wallet.address else ""
                print(f"  {wallet.name}: {wallet.address}{default_marker}{active_marker}")

        elif subcommand == "create":
            # Create wallet
            if len(args) < 2:
                print("Error: Missing wallet name")
                return

            name = args[1]

            # Get password
            password = getpass.getpass("Enter password: ")
            confirm_password = getpass.getpass("Confirm password: ")

            if password != confirm_password:
                print("Error: Passwords do not match")
                return

            # Create wallet
            wallet = self.wallet_manager.create_wallet(name, password)

            if wallet:
                print(f"Wallet created: {wallet.name}")
                print(f"Address: {wallet.address}")

                # Set as active wallet
                self.active_wallet = wallet
                self.prompt = f"synergy ({self.active_wallet.name})> "
            else:
                print("Error: Failed to create wallet")

        elif subcommand == "import":
            # Import wallet from private key
            if len(args) < 3:
                print("Error: Missing wallet name or private key")
                return

            name = args[1]
            private_key = bytes.fromhex(args[2])

            # Get password
            password = getpass.getpass("Enter password: ")
            confirm_password = getpass.getpass("Confirm password: ")

            if password != confirm_password:
                print("Error: Passwords do not match")
                return

            # Import wallet
            wallet = self.wallet_manager.import_wallet(name, private_key, password)

            if wallet:
                print(f"Wallet imported: {wallet.name}")
                print(f"Address: {wallet.address}")

                # Set as active wallet
                self.active_wallet = wallet
                self.prompt = f"synergy ({self.active_wallet.name})> "
            else:
                print("Error: Failed to import wallet")

        elif subcommand == "import_mnemonic":
            # Import wallet from mnemonic
            if len(args) < 3:
                print("Error: Missing wallet name or mnemonic")
                return

            name = args[1]
            mnemonic = " ".join(args[2:])

            # Get password
            password = getpass.getpass("Enter password: ")
            confirm_password = getpass.getpass("Confirm password: ")

            if password != confirm_password:
                print("Error: Passwords do not match")
                return

            # Import wallet
            wallet = self.wallet_manager.import_wallet_from_mnemonic(name, mnemonic, password)

            if wallet:
                print(f"Wallet imported: {wallet.name}")
                print(f"Address: {wallet.address}")

                # Set as active wallet
                self.active_wallet = wallet
                self.prompt = f"synergy ({self.active_wallet.name})> "
            else:
                print("Error: Failed to import wallet")

        elif subcommand == "export":
            # Export wallet private key
            if len(args) < 2:
                print("Error: Missing wallet address")
                return

            address = args[1]

            # Get wallet
            wallet = self.wallet_manager.get_wallet(address)

            if not wallet:
                print(f"Error: Wallet not found: {address}")
                return

            # Get password
            password = getpass.getpass("Enter password: ")

            # Unlock wallet
            private_key = wallet.unlock(password)

            if not private_key:
                print("Error: Invalid password")
                return

            print(f"\nWARNING: Never share your private key with anyone!")
            print(f"Private key: {private_key.hex()}")

        elif subcommand == "export_mnemonic":
            # Export wallet mnemonic
            if len(args) < 2:
                print("Error: Missing wallet address")
                return

            address = args[1]

            # Get wallet
            wallet = self.wallet_manager.get_wallet(address)

            if not wallet:
                print(f"Error: Wallet not found: {address}")
                return

            # Get password
            password = getpass.getpass("Enter password: ")

            # Export mnemonic
            mnemonic = self.wallet_manager.export_wallet_to_mnemonic(address, password)

            if not mnemonic:
                print("Error: Invalid password or failed to export mnemonic")
                return

            print(f"\nWARNING: Never share your mnemonic phrase with anyone!")
            print(f"Mnemonic: {mnemonic}")

        elif subcommand == "show":
            # Show wallet details
            if len(args) < 2:
                # Show active wallet
                if not self.active_wallet:
                    print("Error: No active wallet")
                    return

                wallet = self.active_wallet
            else:
                # Show specified wallet
                address = args[1]
                wallet = self.wallet_manager.get_wallet(address)

                if not wallet:
                    print(f"Error: Wallet not found: {address}")
                    return

            print(f"\nWallet: {wallet.name}")
            print(f"Address: {wallet.address}")
            print(f"Public key: {wallet.public_key}")

            # TODO: Fetch balance from network
            print(f"Balance: [Not available in offline mode]")

        elif subcommand == "set_default":
            # Set default wallet
            if len(args) < 2:
                print("Error: Missing wallet address")
                return

            address = args[1]

            # Set default wallet
            success = self.wallet_manager.set_default_wallet(address)

            if success:
                print(f"Default wallet set: {address}")

                # Update active wallet
                self.active_wallet = self.wallet_manager.get_wallet(address)
                self.prompt = f"synergy ({self.active_wallet.name})> "
            else:
                print(f"Error: Failed to set default wallet")

        elif subcommand == "rename":
            # Rename wallet
            if len(args) < 3:
                print("Error: Missing wallet address or new name")
                return

            address = args[1]
            new_name = args[2]

            # Rename wallet
            success = self.wallet_manager.rename_wallet(address, new_name)

            if success:
                print(f"Wallet renamed: {new_name}")

                # Update prompt if active wallet
                if self.active_wallet and self.active_wallet.address == address:
                    self.active_wallet = self.wallet_manager.get_wallet(address)
                    self.prompt = f"synergy ({self.active_wallet.name})> "
            else:
                print(f"Error: Failed to rename wallet")

        elif subcommand == "delete":
            # Delete wallet
            if len(args) < 2:
                print("Error: Missing wallet address")
                return

            address = args[1]

            # Confirm deletion
            confirm = input(f"Are you sure you want to delete wallet {address}? (y/n): ")

            if confirm.lower() != "y":
                print("Wallet deletion cancelled")
                return

            # Delete wallet
            success = self.wallet_manager.delete_wallet(address)

            if success:
                print(f"Wallet deleted: {address}")

                # Update active wallet if needed
                if self.active_wallet and self.active_wallet.address == address:
                    self.active_wallet = self.wallet_manager.get_default_wallet()
                    if self.active_wallet:
                        self.prompt = f"synergy ({self.active_wallet.name})> "
                    else:
                        self.prompt = "synergy> "
            else:
                print(f"Error: Failed to delete wallet")

        else:
            print(f"Error: Unknown subcommand: {subcommand}")

    # Token commands

    def do_token(self, arg):
        """
        Manage tokens.

        Usage:
          token list
          token create <name> <symbol> <token_type> [initial_supply] [max_supply] [decimals]
          token show <token_id>
          token mint <token_id> <amount> [to_address]
          token burn <token_id> <amount>
          token transfer <token_id> <to_address> <amount>
          token update_metadata <token_id> <key> <value>
          token grant_permission <token_id> <address> <permission>
          token revoke_permission <token_id> <address> <permission>
        """
        args = arg.split()

        if not args:
            print("Error: Missing subcommand")
            return

        subcommand = args[0]

        if subcommand == "list":
            # List tokens
            tokens = self.token_manager.get_tokens()

            if not tokens:
                print("No tokens found")
                return

            print("\nTokens:")
            for token in tokens:
                print(f"  {token.name} ({token.symbol}): {token.token_id}")
                print(f"    Type: {token.token_type}")
                print(f"    Supply: {token.supply}")
                print(f"    Owner: {token.owner}")

        elif subcommand == "create":
            # Create token
            if len(args) < 4:
                print("Error: Missing token name, symbol, or type")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            name = args[1]
            symbol = args[2]
            token_type = args[3]

            # Validate token type
            if token_type not in [TokenType.FUNGIBLE, TokenType.NON_FUNGIBLE, TokenType.SEMI_FUNGIBLE]:
                print(f"Error: Invalid token type: {token_type}")
                print(f"Valid types: {TokenType.FUNGIBLE}, {TokenType.NON_FUNGIBLE}, {TokenType.SEMI_FUNGIBLE}")
                return

            # Parse optional arguments
            initial_supply = int(args[4]) if len(args) > 4 else 0
            max_supply = int(args[5]) if len(args) > 5 else None
            decimals = int(args[6]) if len(args) > 6 else 18

            # Create token
            token = self.token_manager.create_token(
                name=name,
                symbol=symbol,
                token_type=token_type,
                owner=self.active_wallet.address,
                initial_supply=initial_supply,
                max_supply=max_supply,
                decimals=decimals
            )

            if token:
                print(f"Token created: {token.name} ({token.symbol})")
                print(f"Token ID: {token.token_id}")
                print(f"Initial supply: {token.supply}")
            else:
                print("Error: Failed to create token")

        elif subcommand == "show":
            # Show token details
            if len(args) < 2:
                print("Error: Missing token ID")
                return

            token_id = args[1]

            # Get token
            token = self.token_manager.get_token(token_id)

            if not token:
                print(f"Error: Token not found: {token_id}")
                return

            print(f"\nToken: {token.name} ({token.symbol})")
            print(f"ID: {token.token_id}")
            print(f"Type: {token.token_type}")
            print(f"Supply: {token.supply}")
            print(f"Max supply: {token.max_supply or 'Unlimited'}")
            print(f"Decimals: {token.decimals}")
            print(f"Owner: {token.owner}")

            print("\nMetadata:")
            for key, value in token.metadata.items():
                print(f"  {key}: {value}")

            print("\nPermissions:")
            for permission, addresses in token.permissions.items():
                print(f"  {permission}: {', '.join(addresses)}")

        elif subcommand == "mint":
            # Mint tokens
            if len(args) < 3:
                print("Error: Missing token ID or amount")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            token_id = args[1]
            amount = int(args[2])
            to_address = args[3] if len(args) > 3 else None

            # Get token
            token = self.token_manager.get_token(token_id)

            if not token:
                print(f"Error: Token not found: {token_id}")
                return

            # Check permission
            if not token.has_permission(self.active_wallet.address, TokenPermission.MINT):
                print(f"Error: No permission to mint this token")
                return

            # Get password
            password = getpass.getpass("Enter password: ")

            # Create mint transaction
            tx_data = TokenTransaction.create_token_mint_transaction(
                wallet_manager=self.wallet_manager,
                from_address=self.active_wallet.address,
                token_id=token_id,
                to_address=to_address or self.active_wallet.address,
                amount=amount,
                password=password
            )

            if not tx_data:
                print("Error: Failed to create mint transaction")
                return

            # In offline mode, just mint directly
            success = self.token_manager.mint_tokens(
                token_id=token_id,
                amount=amount,
                to_address=to_address,
                from_address=self.active_wallet.address
            )

            if success:
                print(f"Minted {amount} tokens")
                print(f"New supply: {self.token_manager.get_token(token_id).supply}")
            else:
                print("Error: Failed to mint tokens")

        elif subcommand == "burn":
            # Burn tokens
            if len(args) < 3:
                print("Error: Missing token ID or amount")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            token_id = args[1]
            amount = int(args[2])

            # Get token
            token = self.token_manager.get_token(token_id)

            if not token:
                print(f"Error: Token not found: {token_id}")
                return

            # Check permission
            if not token.has_permission(self.active_wallet.address, TokenPermission.BURN):
                print(f"Error: No permission to burn this token")
                return

            # Get password
            password = getpass.getpass("Enter password: ")

            # Create burn transaction
            tx_data = TokenTransaction.create_token_burn_transaction(
                wallet_manager=self.wallet_manager,
                from_address=self.active_wallet.address,
                token_id=token_id,
                amount=amount,
                password=password
            )

            if not tx_data:
                print("Error: Failed to create burn transaction")
                return

            # In offline mode, just burn directly
            success = self.token_manager.burn_tokens(
                token_id=token_id,
                amount=amount,
                from_address=self.active_wallet.address
            )

            if success:
                print(f"Burned {amount} tokens")
                print(f"New supply: {self.token_manager.get_token(token_id).supply}")
            else:
                print("Error: Failed to burn tokens")

        elif subcommand == "transfer":
            # Transfer tokens
            if len(args) < 4:
                print("Error: Missing token ID, recipient address, or amount")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            token_id = args[1]
            to_address = args[2]
            amount = int(args[3])

            # Get token
            token = self.token_manager.get_token(token_id)

            if not token:
                print(f"Error: Token not found: {token_id}")
                return

            # Check permission
            if not token.has_permission(self.active_wallet.address, TokenPermission.TRANSFER):
                print(f"Error: No permission to transfer this token")
                return

            # Get password
            password = getpass.getpass("Enter password: ")

            # Create transfer transaction
            tx_data = TokenTransaction.create_token_transaction(
                wallet_manager=self.wallet_manager,
                from_address=self.active_wallet.address,
                token_id=token_id,
                to_address=to_address,
                amount=amount,
                password=password
            )

            if not tx_data:
                print("Error: Failed to create transfer transaction")
                return

            print(f"Transfer transaction created:")
            print(f"From: {tx_data['from']}")
            print(f"To: {tx_data['to']}")
            print(f"Amount: {tx_data['amount']}")
            print(f"Signature: {tx_data['signature'][:32]}...")

            # In offline mode, we can't actually submit the transaction
            print("\nNote: In offline mode, this transaction cannot be submitted to the network.")

        elif subcommand == "update_metadata":
            # Update token metadata
            if len(args) < 4:
                print("Error: Missing token ID, key, or value")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            token_id = args[1]
            key = args[2]
            value = args[3]

            # Get token
            token = self.token_manager.get_token(token_id)

            if not token:
                print(f"Error: Token not found: {token_id}")
                return

            # Check permission
            if not token.has_permission(self.active_wallet.address, TokenPermission.UPDATE_METADATA):
                print(f"Error: No permission to update metadata for this token")
                return

            # Update metadata
            success = self.token_manager.update_token_metadata(
                token_id=token_id,
                metadata={key: value},
                from_address=self.active_wallet.address
            )

            if success:
                print(f"Metadata updated: {key} = {value}")
            else:
                print("Error: Failed to update metadata")

        elif subcommand == "grant_permission":
            # Grant token permission
            if len(args) < 4:
                print("Error: Missing token ID, address, or permission")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            token_id = args[1]
            address = args[2]
            permission = args[3]

            # Get token
            token = self.token_manager.get_token(token_id)

            if not token:
                print(f"Error: Token not found: {token_id}")
                return

            # Check permission
            if not token.has_permission(self.active_wallet.address, TokenPermission.UPDATE_PERMISSIONS):
                print(f"Error: No permission to update permissions for this token")
                return

            # Grant permission
            success = self.token_manager.grant_token_permission(
                token_id=token_id,
                address=address,
                permission=permission,
                from_address=self.active_wallet.address
            )

            if success:
                print(f"Permission granted: {permission} to {address}")
            else:
                print("Error: Failed to grant permission")

        elif subcommand == "revoke_permission":
            # Revoke token permission
            if len(args) < 4:
                print("Error: Missing token ID, address, or permission")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            token_id = args[1]
            address = args[2]
            permission = args[3]

            # Get token
            token = self.token_manager.get_token(token_id)

            if not token:
                print(f"Error: Token not found: {token_id}")
                return

            # Check permission
            if not token.has_permission(self.active_wallet.address, TokenPermission.UPDATE_PERMISSIONS):
                print(f"Error: No permission to update permissions for this token")
                return

            # Revoke permission
            success = self.token_manager.revoke_token_permission(
                token_id=token_id,
                address=address,
                permission=permission,
                from_address=self.active_wallet.address
            )

            if success:
                print(f"Permission revoked: {permission} from {address}")
            else:
                print("Error: Failed to revoke permission")

        else:
            print(f"Error: Unknown subcommand: {subcommand}")

    # Naming commands

    def do_naming(self, arg):
        """
        Manage Synergy Naming System domains.

        Usage:
          naming list
          naming check <domain_name>
          naming register <domain_name> [registration_period]
          naming renew <domain_name> [renewal_period]
          naming show <domain_name>
          naming transfer <domain_name> <new_owner>
          naming set_record <domain_name> <record_type> <value>
          naming get_record <domain_name> <record_type>
          naming delete_record <domain_name> <record_type>
          naming resolve <domain_name>
          naming reverse_resolve <address>
        """
        args = arg.split()

        if not args:
            print("Error: Missing subcommand")
            return

        subcommand = args[0]

        if subcommand == "list":
            # List domains
            if not self.active_wallet:
                # List all domains
                domains = self.naming_system.get_domains()
            else:
                # List domains owned by active wallet
                domains = self.naming_system.get_domains_by_owner(self.active_wallet.address)

            if not domains:
                print("No domains found")
                return

            print("\nDomains:")
            for domain in domains:
                print(f"  {domain.name}")
                print(f"    Owner: {domain.owner}")
                print(f"    Status: {domain.status}")
                print(f"    Expiration: {time.strftime('%Y-%m-%d', time.gmtime(domain.expiration_date)) if domain.expiration_date else 'N/A'}")

        elif subcommand == "check":
            # Check domain availability
            if len(args) < 2:
                print("Error: Missing domain name")
                return

            domain_name = args[1]

            # Check availability
            available, reason = self.naming_system.check_domain_availability(domain_name)

            if available:
                print(f"Domain {domain_name} is available")
            else:
                print(f"Domain {domain_name} is not available: {reason}")

        elif subcommand == "register":
            # Register domain
            if len(args) < 2:
                print("Error: Missing domain name")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            domain_name = args[1]
            registration_period = int(args[2]) if len(args) > 2 else None

            # Check availability
            available, reason = self.naming_system.check_domain_availability(domain_name)

            if not available:
                print(f"Domain {domain_name} is not available: {reason}")
                return

            # Get password
            password = getpass.getpass("Enter password: ")

            # Create registration transaction
            tx_data = NamingTransaction.create_domain_registration_transaction(
                wallet_manager=self.wallet_manager,
                from_address=self.active_wallet.address,
                domain_name=domain_name,
                registration_period=registration_period,
                records={
                    "address": self.active_wallet.address
                },
                password=password
            )

            if not tx_data:
                print("Error: Failed to create registration transaction")
                return

            # In offline mode, just register directly
            domain = self.naming_system.register_domain(
                name=domain_name,
                owner=self.active_wallet.address,
                registration_period=registration_period,
                records={
                    "address": self.active_wallet.address
                }
            )

            if domain:
                print(f"Domain registered: {domain.name}")
                print(f"Owner: {domain.owner}")
                print(f"Expiration: {time.strftime('%Y-%m-%d', time.gmtime(domain.expiration_date))}")
            else:
                print("Error: Failed to register domain")

        elif subcommand == "renew":
            # Renew domain
            if len(args) < 2:
                print("Error: Missing domain name")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            domain_name = args[1]
            renewal_period = int(args[2]) if len(args) > 2 else None

            # Get domain
            domain = self.naming_system.get_domain(domain_name)

            if not domain:
                print(f"Error: Domain not found: {domain_name}")
                return

            # Check ownership
            if domain.owner != self.active_wallet.address:
                print(f"Error: You do not own this domain")
                return

            # Get password
            password = getpass.getpass("Enter password: ")

            # Create renewal transaction
            tx_data = NamingTransaction.create_domain_renewal_transaction(
                wallet_manager=self.wallet_manager,
                from_address=self.active_wallet.address,
                domain_name=domain_name,
                renewal_period=renewal_period,
                password=password
            )

            if not tx_data:
                print("Error: Failed to create renewal transaction")
                return

            # In offline mode, just renew directly
            success = self.naming_system.renew_domain(
                name=domain_name,
                period=renewal_period
            )

            if success:
                domain = self.naming_system.get_domain(domain_name)
                print(f"Domain renewed: {domain_name}")
                print(f"New expiration: {time.strftime('%Y-%m-%d', time.gmtime(domain.expiration_date))}")
            else:
                print("Error: Failed to renew domain")

        elif subcommand == "show":
            # Show domain details
            if len(args) < 2:
                print("Error: Missing domain name")
                return

            domain_name = args[1]

            # Get domain
            domain = self.naming_system.get_domain(domain_name)

            if not domain:
                print(f"Error: Domain not found: {domain_name}")
                return

            print(f"\nDomain: {domain.name}")
            print(f"Owner: {domain.owner}")
            print(f"Status: {domain.status}")
            print(f"Registration date: {time.strftime('%Y-%m-%d', time.gmtime(domain.registration_date)) if domain.registration_date else 'N/A'}")
            print(f"Expiration date: {time.strftime('%Y-%m-%d', time.gmtime(domain.expiration_date)) if domain.expiration_date else 'N/A'}")

            if domain.resolver:
                print(f"Resolver: {domain.resolver}")

            print("\nRecords:")
            for record_type, value in domain.records.items():
                print(f"  {record_type}: {value}")

        elif subcommand == "transfer":
            # Transfer domain
            if len(args) < 3:
                print("Error: Missing domain name or new owner")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            domain_name = args[1]
            new_owner = args[2]

            # Get domain
            domain = self.naming_system.get_domain(domain_name)

            if not domain:
                print(f"Error: Domain not found: {domain_name}")
                return

            # Check ownership
            if domain.owner != self.active_wallet.address:
                print(f"Error: You do not own this domain")
                return

            # Get password
            password = getpass.getpass("Enter password: ")

            # Create transfer transaction
            tx_data = NamingTransaction.create_domain_transfer_transaction(
                wallet_manager=self.wallet_manager,
                from_address=self.active_wallet.address,
                domain_name=domain_name,
                to_address=new_owner,
                password=password
            )

            if not tx_data:
                print("Error: Failed to create transfer transaction")
                return

            # In offline mode, just transfer directly
            success = self.naming_system.transfer_domain(
                name=domain_name,
                new_owner=new_owner
            )

            if success:
                print(f"Domain transferred: {domain_name}")
                print(f"New owner: {new_owner}")
            else:
                print("Error: Failed to transfer domain")

        elif subcommand == "set_record":
            # Set domain record
            if len(args) < 4:
                print("Error: Missing domain name, record type, or value")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            domain_name = args[1]
            record_type = args[2]
            value = args[3]

            # Get domain
            domain = self.naming_system.get_domain(domain_name)

            if not domain:
                print(f"Error: Domain not found: {domain_name}")
                return

            # Check ownership
            if domain.owner != self.active_wallet.address:
                print(f"Error: You do not own this domain")
                return

            # Set record
            success = self.naming_system.set_domain_record(
                name=domain_name,
                record_type=record_type,
                value=value
            )

            if success:
                print(f"Record set: {record_type} = {value}")
            else:
                print("Error: Failed to set record")

        elif subcommand == "get_record":
            # Get domain record
            if len(args) < 3:
                print("Error: Missing domain name or record type")
                return

            domain_name = args[1]
            record_type = args[2]

            # Get record
            value = self.naming_system.get_domain_record(
                name=domain_name,
                record_type=record_type
            )

            if value is not None:
                print(f"Record {record_type}: {value}")
            else:
                print(f"Record not found: {record_type}")

        elif subcommand == "delete_record":
            # Delete domain record
            if len(args) < 3:
                print("Error: Missing domain name or record type")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            domain_name = args[1]
            record_type = args[2]

            # Get domain
            domain = self.naming_system.get_domain(domain_name)

            if not domain:
                print(f"Error: Domain not found: {domain_name}")
                return

            # Check ownership
            if domain.owner != self.active_wallet.address:
                print(f"Error: You do not own this domain")
                return

            # Delete record
            success = self.naming_system.delete_domain_record(
                name=domain_name,
                record_type=record_type
            )

            if success:
                print(f"Record deleted: {record_type}")
            else:
                print("Error: Failed to delete record")

        elif subcommand == "resolve":
            # Resolve domain name
            if len(args) < 2:
                print("Error: Missing domain name")
                return

            domain_name = args[1]

            # Resolve name
            address = self.naming_system.resolve_name(domain_name)

            if address:
                print(f"Resolved {domain_name} to: {address}")
            else:
                print(f"Failed to resolve {domain_name}")

        elif subcommand == "reverse_resolve":
            # Reverse resolve address
            if len(args) < 2:
                print("Error: Missing address")
                return

            address = args[1]

            # Reverse resolve
            name = self.naming_system.reverse_resolve(address)

            if name:
                print(f"Reverse resolved {address} to: {name}")
            else:
                print(f"Failed to reverse resolve {address}")

        else:
            print(f"Error: Unknown subcommand: {subcommand}")

def main():
    """Main entry point for the CLI."""
    parser = argparse.ArgumentParser(description="Synergy Network Utility CLI")
    parser.add_argument("--config", help="Path to configuration directory")
    args = parser.parse_args()

    # Set config directory if provided
    if args.config:
        get_config(args.config)

    # Start CLI
    cli = SynergyUtilityCLI()
    cli.cmdloop()

if __name__ == "__main__":
    main()
