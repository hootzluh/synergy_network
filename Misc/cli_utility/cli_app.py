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

# Add parent directory to path to import from common package
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
from common.config import get_config

# Import core modules - these will need to be moved or adjusted
# For now, we'll keep the imports but they'll need to be fixed in step 006
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
          wallet create <n>
          wallet import <n> <private_key>
          wallet import_mnemonic <n> <mnemonic>
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
            # List all wallets
            wallets = self.wallet_manager.get_all_wallets()

            if not wallets:
                print("No wallets found")
                return

            print("\nWallets:")
            for wallet in wallets:
                default_marker = " (default)" if wallet.is_default else ""
                print(f"  {wallet.name}: {wallet.address}{default_marker}")

        elif subcommand == "create":
            # Create a new wallet
            if len(args) < 2:
                print("Error: Missing wallet name")
                return

            name = args[1]

            # Get password
            password = getpass.getpass("Enter password: ")
            password_confirm = getpass.getpass("Confirm password: ")

            if password != password_confirm:
                print("Error: Passwords do not match")
                return

            # Create wallet
            wallet = self.wallet_manager.create_wallet(name, password)

            if wallet:
                print(f"Wallet created: {wallet.name}")
                print(f"Address: {wallet.address}")
                print(f"Mnemonic: {wallet.mnemonic}")
                print("\nIMPORTANT: Save your mnemonic phrase in a secure location!")
            else:
                print("Error: Failed to create wallet")

        elif subcommand == "import":
            # Import wallet from private key
            if len(args) < 3:
                print("Error: Missing wallet name or private key")
                return

            name = args[1]
            private_key = args[2]

            # Get password
            password = getpass.getpass("Enter password: ")
            password_confirm = getpass.getpass("Confirm password: ")

            if password != password_confirm:
                print("Error: Passwords do not match")
                return

            # Import wallet
            wallet = self.wallet_manager.import_wallet(name, private_key, password)

            if wallet:
                print(f"Wallet imported: {wallet.name}")
                print(f"Address: {wallet.address}")
            else:
                print("Error: Failed to import wallet")

        elif subcommand == "import_mnemonic":
            # Import wallet from mnemonic
            if len(args) < 3:
                print("Error: Missing wallet name or mnemonic")
                return

            name = args[1]
            mnemonic = args[2]

            # Get password
            password = getpass.getpass("Enter password: ")
            password_confirm = getpass.getpass("Confirm password: ")

            if password != password_confirm:
                print("Error: Passwords do not match")
                return

            # Import wallet
            wallet = self.wallet_manager.import_wallet_from_mnemonic(name, mnemonic, password)

            if wallet:
                print(f"Wallet imported: {wallet.name}")
                print(f"Address: {wallet.address}")
            else:
                print("Error: Failed to import wallet")

        elif subcommand == "export":
            # Export wallet private key
            if len(args) < 2:
                print("Error: Missing wallet address")
                return

            address = args[1]

            # Get password
            password = getpass.getpass("Enter password: ")

            # Export wallet
            private_key = self.wallet_manager.export_wallet(address, password)

            if private_key:
                print(f"Private key: {private_key}")
            else:
                print("Error: Failed to export wallet")

        elif subcommand == "export_mnemonic":
            # Export wallet mnemonic
            if len(args) < 2:
                print("Error: Missing wallet address")
                return

            address = args[1]

            # Get password
            password = getpass.getpass("Enter password: ")

            # Export wallet mnemonic
            mnemonic = self.wallet_manager.export_wallet_mnemonic(address, password)

            if mnemonic:
                print(f"Mnemonic: {mnemonic}")
            else:
                print("Error: Failed to export wallet mnemonic")

        elif subcommand == "show":
            # Show wallet details
            if len(args) > 1:
                address = args[1]
                wallet = self.wallet_manager.get_wallet_by_address(address)
            else:
                wallet = self.active_wallet

            if not wallet:
                print("Error: Wallet not found")
                return

            print(f"\nWallet: {wallet.name}")
            print(f"Address: {wallet.address}")
            print(f"Balance: {wallet.get_balance()} SYN")
            print(f"Nonce: {wallet.get_nonce()}")
            print(f"Default: {wallet.is_default}")

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
                self.active_wallet = self.wallet_manager.get_wallet_by_address(address)
                self.prompt = f"synergy ({self.active_wallet.name})> "
            else:
                print("Error: Failed to set default wallet")

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
                if self.active_wallet and self.active_wallet.address == address:
                    self.active_wallet = self.wallet_manager.get_wallet_by_address(address)
                    self.prompt = f"synergy ({self.active_wallet.name})> "
            else:
                print("Error: Failed to rename wallet")

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
                if self.active_wallet and self.active_wallet.address == address:
                    self.active_wallet = self.wallet_manager.get_default_wallet()
                    if self.active_wallet:
                        self.prompt = f"synergy ({self.active_wallet.name})> "
                    else:
                        self.prompt = "synergy> "
            else:
                print("Error: Failed to delete wallet")

        else:
            print(f"Error: Unknown subcommand: {subcommand}")

    # Token commands

    def do_token(self, arg):
        """
        Manage tokens.

        Usage:
          token list
          token create <name> <symbol> <supply> <decimals> <type>
          token transfer <token_id> <to_address> <amount>
          token approve <token_id> <spender_address> <amount>
          token mint <token_id> <amount>
          token burn <token_id> <amount>
          token show <token_id>
        """
        args = arg.split()

        if not args:
            print("Error: Missing subcommand")
            return

        subcommand = args[0]

        if subcommand == "list":
            # List all tokens
            tokens = self.token_manager.get_all_tokens()

            if not tokens:
                print("No tokens found")
                return

            print("\nTokens:")
            for token in tokens:
                print(f"  {token.name} ({token.symbol}): {token.token_id}")
                print(f"    Supply: {token.total_supply} (Decimals: {token.decimals})")
                print(f"    Type: {token.token_type.name}")
                print(f"    Owner: {token.owner}")

        elif subcommand == "create":
            # Create a new token
            if len(args) < 6:
                print("Error: Missing token parameters")
                return

            name = args[1]
            symbol = args[2]
            supply = float(args[3])
            decimals = int(args[4])
            token_type_str = args[5]

            # Validate token type
            try:
                token_type = TokenType[token_type_str.upper()]
            except KeyError:
                print(f"Error: Invalid token type: {token_type_str}")
                print(f"Valid types: {', '.join([t.name for t in TokenType])}")
                return

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            # Get password
            password = getpass.getpass("Enter wallet password: ")

            # Create token
            token = self.token_manager.create_token(
                name=name,
                symbol=symbol,
                total_supply=supply,
                decimals=decimals,
                token_type=token_type,
                owner=self.active_wallet.address,
                password=password
            )

            if token:
                print(f"Token created: {token.name} ({token.symbol})")
                print(f"Token ID: {token.token_id}")
                print(f"Supply: {token.total_supply} (Decimals: {token.decimals})")
                print(f"Type: {token.token_type.name}")
                print(f"Owner: {token.owner}")
            else:
                print("Error: Failed to create token")

        elif subcommand == "transfer":
            # Transfer tokens
            if len(args) < 4:
                print("Error: Missing token ID, recipient address, or amount")
                return

            token_id = args[1]
            to_address = args[2]
            amount = float(args[3])

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            # Get password
            password = getpass.getpass("Enter wallet password: ")

            # Transfer tokens
            tx = self.token_manager.transfer(
                token_id=token_id,
                from_address=self.active_wallet.address,
                to_address=to_address,
                amount=amount,
                password=password
            )

            if tx:
                print(f"Tokens transferred: {amount}")
                print(f"Transaction ID: {tx.tx_id}")
                print(f"From: {tx.from_address}")
                print(f"To: {tx.to_address}")
                print(f"Status: {tx.status}")
            else:
                print("Error: Failed to transfer tokens")

        elif subcommand == "approve":
            # Approve token spending
            if len(args) < 4:
                print("Error: Missing token ID, spender address, or amount")
                return

            token_id = args[1]
            spender_address = args[2]
            amount = float(args[3])

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            # Get password
            password = getpass.getpass("Enter wallet password: ")

            # Approve token spending
            tx = self.token_manager.approve(
                token_id=token_id,
                owner_address=self.active_wallet.address,
                spender_address=spender_address,
                amount=amount,
                password=password
            )

            if tx:
                print(f"Token spending approved: {amount}")
                print(f"Transaction ID: {tx.tx_id}")
                print(f"Owner: {tx.from_address}")
                print(f"Spender: {spender_address}")
                print(f"Status: {tx.status}")
            else:
                print("Error: Failed to approve token spending")

        elif subcommand == "mint":
            # Mint tokens
            if len(args) < 3:
                print("Error: Missing token ID or amount")
                return

            token_id = args[1]
            amount = float(args[2])

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            # Get password
            password = getpass.getpass("Enter wallet password: ")

            # Mint tokens
            tx = self.token_manager.mint(
                token_id=token_id,
                owner_address=self.active_wallet.address,
                amount=amount,
                password=password
            )

            if tx:
                print(f"Tokens minted: {amount}")
                print(f"Transaction ID: {tx.tx_id}")
                print(f"Owner: {tx.from_address}")
                print(f"Status: {tx.status}")
            else:
                print("Error: Failed to mint tokens")

        elif subcommand == "burn":
            # Burn tokens
            if len(args) < 3:
                print("Error: Missing token ID or amount")
                return

            token_id = args[1]
            amount = float(args[2])

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            # Get password
            password = getpass.getpass("Enter wallet password: ")

            # Burn tokens
            tx = self.token_manager.burn(
                token_id=token_id,
                owner_address=self.active_wallet.address,
                amount=amount,
                password=password
            )

            if tx:
                print(f"Tokens burned: {amount}")
                print(f"Transaction ID: {tx.tx_id}")
                print(f"Owner: {tx.from_address}")
                print(f"Status: {tx.status}")
            else:
                print("Error: Failed to burn tokens")

        elif subcommand == "show":
            # Show token details
            if len(args) < 2:
                print("Error: Missing token ID")
                return

            token_id = args[1]

            # Get token
            token = self.token_manager.get_token(token_id)

            if not token:
                print("Error: Token not found")
                return

            print(f"\nToken: {token.name} ({token.symbol})")
            print(f"Token ID: {token.token_id}")
            print(f"Supply: {token.total_supply} (Decimals: {token.decimals})")
            print(f"Type: {token.token_type.name}")
            print(f"Owner: {token.owner}")

            # Show token permissions if applicable
            if token.token_type in [TokenType.FUNGIBLE, TokenType.NON_FUNGIBLE]:
                permissions = token.get_permissions()
                print("\nPermissions:")
                for permission in permissions:
                    print(f"  {permission.name}: {permission.value}")

            # Show token balance if wallet is active
            if self.active_wallet:
                balance = token.get_balance(self.active_wallet.address)
                print(f"\nYour balance: {balance}")

        else:
            print(f"Error: Unknown subcommand: {subcommand}")

    # Naming system commands

    def do_domain(self, arg):
        """
        Manage domain names.

        Usage:
          domain list
          domain register <name> <duration>
          domain renew <name> <duration>
          domain transfer <name> <to_address>
          domain set_resolver <name> <resolver_address>
          domain set_record <name> <key> <value>
          domain show <name>
        """
        args = arg.split()

        if not args:
            print("Error: Missing subcommand")
            return

        subcommand = args[0]

        if subcommand == "list":
            # List all domains owned by the active wallet
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            domains = self.naming_system.get_domains_by_owner(self.active_wallet.address)

            if not domains:
                print("No domains found")
                return

            print("\nDomains:")
            for domain in domains:
                print(f"  {domain.name}.syn")
                print(f"    Expiration: {domain.expiration_date}")
                print(f"    Status: {domain.status.name}")

        elif subcommand == "register":
            # Register a new domain
            if len(args) < 3:
                print("Error: Missing domain name or duration")
                return

            name = args[1]
            duration = int(args[2])  # Duration in days

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            # Get password
            password = getpass.getpass("Enter wallet password: ")

            # Register domain
            tx = self.naming_system.register_domain(
                name=name,
                owner_address=self.active_wallet.address,
                duration=duration,
                password=password
            )

            if tx:
                print(f"Domain registered: {name}.syn")
                print(f"Transaction ID: {tx.tx_id}")
                print(f"Owner: {tx.from_address}")
                print(f"Duration: {duration} days")
                print(f"Status: {tx.status}")
            else:
                print("Error: Failed to register domain")

        elif subcommand == "renew":
            # Renew domain
            if len(args) < 3:
                print("Error: Missing domain name or duration")
                return

            name = args[1]
            duration = int(args[2])  # Duration in days

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            # Get password
            password = getpass.getpass("Enter wallet password: ")

            # Renew domain
            tx = self.naming_system.renew_domain(
                name=name,
                owner_address=self.active_wallet.address,
                duration=duration,
                password=password
            )

            if tx:
                print(f"Domain renewed: {name}.syn")
                print(f"Transaction ID: {tx.tx_id}")
                print(f"Owner: {tx.from_address}")
                print(f"Duration: {duration} days")
                print(f"Status: {tx.status}")
            else:
                print("Error: Failed to renew domain")

        elif subcommand == "transfer":
            # Transfer domain
            if len(args) < 3:
                print("Error: Missing domain name or recipient address")
                return

            name = args[1]
            to_address = args[2]

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            # Get password
            password = getpass.getpass("Enter wallet password: ")

            # Transfer domain
            tx = self.naming_system.transfer_domain(
                name=name,
                from_address=self.active_wallet.address,
                to_address=to_address,
                password=password
            )

            if tx:
                print(f"Domain transferred: {name}.syn")
                print(f"Transaction ID: {tx.tx_id}")
                print(f"From: {tx.from_address}")
                print(f"To: {to_address}")
                print(f"Status: {tx.status}")
            else:
                print("Error: Failed to transfer domain")

        elif subcommand == "set_resolver":
            # Set domain resolver
            if len(args) < 3:
                print("Error: Missing domain name or resolver address")
                return

            name = args[1]
            resolver_address = args[2]

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            # Get password
            password = getpass.getpass("Enter wallet password: ")

            # Set domain resolver
            tx = self.naming_system.set_domain_resolver(
                name=name,
                owner_address=self.active_wallet.address,
                resolver_address=resolver_address,
                password=password
            )

            if tx:
                print(f"Domain resolver set: {name}.syn")
                print(f"Transaction ID: {tx.tx_id}")
                print(f"Owner: {tx.from_address}")
                print(f"Resolver: {resolver_address}")
                print(f"Status: {tx.status}")
            else:
                print("Error: Failed to set domain resolver")

        elif subcommand == "set_record":
            # Set domain record
            if len(args) < 4:
                print("Error: Missing domain name, key, or value")
                return

            name = args[1]
            key = args[2]
            value = args[3]

            # Check if wallet is active
            if not self.active_wallet:
                print("Error: No active wallet")
                return

            # Get password
            password = getpass.getpass("Enter wallet password: ")

            # Set domain record
            tx = self.naming_system.set_domain_record(
                name=name,
                owner_address=self.active_wallet.address,
                key=key,
                value=value,
                password=password
            )

            if tx:
                print(f"Domain record set: {name}.syn")
                print(f"Transaction ID: {tx.tx_id}")
                print(f"Owner: {tx.from_address}")
                print(f"Key: {key}")
                print(f"Value: {value}")
                print(f"Status: {tx.status}")
            else:
                print("Error: Failed to set domain record")

        elif subcommand == "show":
            # Show domain details
            if len(args) < 2:
                print("Error: Missing domain name")
                return

            name = args[1]

            # Get domain
            domain = self.naming_system.get_domain(name)

            if not domain:
                print("Error: Domain not found")
                return

            print(f"\nDomain: {domain.name}.syn")
            print(f"Owner: {domain.owner}")
            print(f"Registration Date: {domain.registration_date}")
            print(f"Expiration Date: {domain.expiration_date}")
            print(f"Status: {domain.status.name}")
            print(f"Resolver: {domain.resolver}")

            # Show domain records
            records = domain.get_records()
            if records:
                print("\nRecords:")
                for key, value in records.items():
                    print(f"  {key}: {value}")
            else:
                print("\nNo records found")

        else:
            print(f"Error: Unknown subcommand: {subcommand}")

def main():
    """Main entry point for the CLI."""
    parser = argparse.ArgumentParser(description="Synergy Network Utility CLI")
    parser.add_argument("--config", help="Path to config file")
    parser.add_argument("--network", choices=["mainnet", "testnet", "local"], help="Network to connect to")
    parser.add_argument("--wallet", help="Wallet to use")
    args = parser.parse_args()

    # TODO: Handle command-line arguments

    # Start the CLI
    cli = SynergyUtilityCLI()
    cli.cmdloop()

if __name__ == "__main__":
    main()
