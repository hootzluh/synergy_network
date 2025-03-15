# Synergy Network Setup Instructions

This document provides comprehensive instructions for setting up and using the Synergy Network CLI and GUI utility tools.

## Prerequisites

### System Requirements
- **Operating System**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+ recommended)
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: Minimum 10GB free disk space
- **Network**: Stable internet connection

### CLI Tool Requirements
- **Python**: Version 3.8 or higher
- **pip**: Latest version

### GUI Tool Requirements
- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 7.0.0 or higher

## Installation

### Installing the CLI Utility Tool

1. **Clone the repository or download the CLI utility**
   ```bash
   git clone https://github.com/your-username/synergy-network.git
   cd synergy-network/cli_utility
   ```

2. **Install required dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Install the CLI tool (optional)**
   ```bash
   pip install -e .
   ```
   This will install the CLI tool in development mode, allowing you to run it from anywhere using the `synergy-cli` command.

4. **Verify installation**
   ```bash
   python cli_app.py --help
   ```
   You should see the help message for the Synergy Network CLI utility.

### Installing the GUI Utility Tool

1. **Clone the repository or download the GUI utility**
   ```bash
   git clone https://github.com/your-username/synergy-network.git
   cd synergy-network/gui_utility
   ```

2. **Install required dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm start
   ```
   This should launch the Synergy Network GUI utility application.

## Configuration

### CLI Tool Configuration

The CLI tool uses a configuration file to store settings. You can view and modify the configuration using the `config` command:

```bash
# Show current configuration
python cli_app.py config show

# Set configuration value
python cli_app.py config set network.active_network testnet

# Reset configuration to defaults
python cli_app.py config reset
```

### GUI Tool Configuration

The GUI tool configuration can be accessed through the Settings panel in the application:

1. Launch the GUI application
2. Click on the Settings icon in the sidebar
3. Adjust network settings, theme, language, and other options
4. Click Save to apply changes

## Usage

### Using the CLI Utility Tool

The CLI tool provides a command-line interface for managing wallets, tokens, and domain names on the Synergy Network.

#### Starting the CLI Tool
```bash
python cli_app.py
```

#### Available Commands

Once in the CLI interface, you can use the following commands:

- **General Commands**
  - `help` - Show available commands
  - `exit` or `quit` - Exit the program
  - `config` - View or modify configuration

- **Wallet Commands**
  - `wallet list` - List all wallets
  - `wallet create <name>` - Create a new wallet
  - `wallet import <name> <private_key>` - Import wallet from private key
  - `wallet import_mnemonic <name> <mnemonic>` - Import wallet from mnemonic
  - `wallet export <address>` - Export wallet private key
  - `wallet export_mnemonic <address>` - Export wallet mnemonic
  - `wallet show [address]` - Show wallet details
  - `wallet set_default <address>` - Set default wallet
  - `wallet rename <address> <new_name>` - Rename wallet
  - `wallet delete <address>` - Delete wallet

- **Token Commands**
  - `token list` - List all tokens
  - `token create <name> <symbol> <supply> <decimals> <type>` - Create a new token
  - `token transfer <token_id> <to_address> <amount>` - Transfer tokens
  - `token approve <token_id> <spender_address> <amount>` - Approve token spending
  - `token mint <token_id> <amount>` - Mint tokens
  - `token burn <token_id> <amount>` - Burn tokens
  - `token show <token_id>` - Show token details

- **Domain Commands**
  - `domain list` - List all domains owned by the active wallet
  - `domain register <name> <duration>` - Register a new domain
  - `domain renew <name> <duration>` - Renew domain
  - `domain transfer <name> <to_address>` - Transfer domain
  - `domain set_resolver <name> <resolver_address>` - Set domain resolver
  - `domain set_record <name> <key> <value>` - Set domain record
  - `domain show <name>` - Show domain details

### Using the GUI Utility Tool

The GUI tool provides a graphical interface for managing wallets, tokens, and domain names on the Synergy Network.

#### Starting the GUI Tool
```bash
npm start
```

#### Navigation

The GUI application has a sidebar with the following sections:

- **Dashboard** - Overview of your wallets and tokens
- **Wallets** - Manage your wallets
- **Tokens** - Manage your tokens
- **Domains** - Manage your domain names
- **Settings** - Configure application settings
- **Help** - Access help and documentation

#### Wallet Management

1. Navigate to the Wallets section
2. Use the buttons to create, import, or manage wallets
3. Click on a wallet to view its details and perform actions

#### Token Management

1. Navigate to the Tokens section
2. Use the buttons to create, transfer, or manage tokens
3. Click on a token to view its details and perform actions

#### Domain Management

1. Navigate to the Domains section
2. Use the buttons to register, renew, or manage domains
3. Click on a domain to view its details and perform actions

## Troubleshooting

### Common Issues with CLI Tool

1. **Python Version Issues**
   - Ensure you have Python 3.8 or higher installed
   - Check your Python version with `python --version`

2. **Dependency Issues**
   - Ensure all dependencies are installed correctly
   - Try reinstalling dependencies with `pip install -r requirements.txt`

3. **Configuration Issues**
   - Check your configuration with `python cli_app.py config show`
   - Reset to defaults with `python cli_app.py config reset`

### Common Issues with GUI Tool

1. **Node.js Version Issues**
   - Ensure you have Node.js 16.0.0 or higher installed
   - Check your Node.js version with `node --version`

2. **Dependency Issues**
   - Ensure all dependencies are installed correctly
   - Try reinstalling dependencies with `npm install`

3. **Application Launch Issues**
   - Check for error messages in the console
   - Try running with verbose logging: `npm start -- --verbose`

## Support

If you encounter any issues not covered in this guide:

1. Check the console output for error messages
2. Review the logs in the respective component directories
3. Consult the full documentation in the `docs/` directory
4. Submit an issue on the GitHub repository

## License

MIT
