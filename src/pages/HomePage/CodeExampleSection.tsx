import React, { useState } from 'react';
import './CodeExampleSection.css';
import GridParticles from './GridParticles'; // Import new Canvas particle component

// Note: In the future, we can add Prism.js or highlight.js for proper syntax highlighting
// Example: npm install prismjs @types/prismjs
// Then import: import Prism from 'prismjs';
// And call Prism.highlightAll() in useEffect

interface CodeTab {
  id: string;
  label: string;
  language: string;
  code: string;
}

// Define interface for CSS variables style
interface ParticleStyle {
  // Use string index signature to allow custom CSS variables
  [key: string]: string | undefined;
}

const CodeExampleSection: React.FC = () => {
  // Define code example tabs
  const codeTabs: CodeTab[] = [
    {
      id: 'python',
      label: 'Python',
      language: 'python',
      code: `# Using PromptHub SDK to register and monetize prompts as assets
import prompthub
from prompthub import PromptClient, PromptVault, PromptAsset

# Initialize client
client = PromptClient(
    api_key="YOUR_API_KEY",
    network="mainnet"  # or "devnet" for testing
)

# Connect wallet
vault = PromptVault.connect_wallet(client, "your_wallet_keypair.json")

# Register a new prompt as an on-chain asset
prompt_asset = vault.register_prompt_asset(
    name="Medical Diagnostic Prompt",
    description="Expert system for preliminary medical diagnosis",
    content="""
    As a medical expert, analyze the following symptoms and patient history:
    Symptoms: {{symptoms}}
    Medical History: {{medical_history}}
    Age: {{age}}
    
    Provide: 
    1. Possible diagnoses in order of likelihood
    2. Recommended tests to confirm diagnosis
    3. Warning signs that require immediate attention
    """,
    variables=["symptoms", "medical_history", "age"],
    tags=["medical", "diagnostics", "expert-system"],
    license_type="premium",  # Sets monetization model
    usage_fee=0.5,  # Fee in $PHUB tokens per execution
    royalty_percentage=3.0  # Percentage for derivative works
)

print(f"Prompt asset registered on-chain, ID: {prompt_asset.id}")
print(f"Asset URI: {prompt_asset.uri}")
print(f"License type: {prompt_asset.license_type}")

# Mint prompt as NFT for ownership and trading
nft_mint = vault.mint_prompt_nft(
    prompt_id=prompt_asset.id,
    metadata={
        "name": "Medical Expert System v1.0",
        "symbol": "MEDX",
        "description": "Premium medical diagnostic prompt created by Dr. Smith",
        "image": "https://ipfs.prompthub.io/QmXyZ123..."
    }
)

print(f"Prompt NFT minted: {nft_mint.token_address}")

# Execute the registered prompt with PromptSig verification
response = client.execute_prompt_asset(
    prompt_id=prompt_asset.id,
    variables={
        "symptoms": "Persistent headache, fatigue, elevated blood pressure",
        "medical_history": "Type 2 diabetes diagnosed 3 years ago",
        "age": "57"
    },
    model="claude-3",  # specify AI model
    record_execution=True  # Creates cryptographic proof of execution
)

print(f"Execution signature: {response.signature}")
print(f"Response: {response.content}")`
    },
    {
      id: 'typescript',
      label: 'TypeScript',
      language: 'typescript',
      code: `// Using PromptHub SDK to create and execute prompt DAGs as tradable assets
import { PromptClient, PromptVault, DagAsset, PromptSig } from '@prompthub/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useState, useEffect } from 'react';

const PromptAssetComponent: FC = () => {
  const { publicKey, signTransaction } = useWallet();
  const [result, setResult] = useState<string>('');
  const [assetId, setAssetId] = useState<string>('');
  const [executionSig, setExecutionSig] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const createAndExecutePromptAsset = async () => {
    if (!publicKey) {
      setError('Please connect your wallet first');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Initialize PromptHub client
      const client = new PromptClient({
        network: 'mainnet',
        wallet: {
          publicKey: publicKey.toString(),
          signTransaction
        }
      });
      
      // Create Prompt Vault instance
      const vault = new PromptVault(client);
      
      // Create a specialized DAG asset combining multiple prompts
      const dagAsset = await vault.createDagAsset({
        name: "Financial Analysis Pipeline",
        description: "Multi-step financial data analysis and reporting workflow",
        nodes: [
          {
            id: "data_processor", 
            promptId: "data_cleaner_v2",
            inputs: {
              dataSource: "{{inputData}}"
            }
          },
          {
            id: "analyzer",
            promptId: "financial_patterns_v3",
            inputs: {
              cleanData: "{{data_processor.output}}"
            }
          },
          {
            id: "report_generator",
            promptId: "executive_summary_creator",
            inputs: {
              analysis: "{{analyzer.output}}",
              audience: "{{audience}}",
              format: "{{format}}"
            }
          }
        ],
        license: {
          type: "commercial",
          fee: 2.5, // PHUB tokens per execution
          allowFork: true,
          royalty: 5.0 // Percentage paid to original creator when forked
        }
      });
      
      setAssetId(dagAsset.id);
      
      // Execute the DAG asset with PromptSig verification
      const executionResult = await client.executeDagAsset({
        dagId: dagAsset.id,
        inputs: {
          'inputData': 'quarterly_earnings_2025.csv',
          'audience': 'board_members',
          'format': 'presentation'
        },
        recordExecution: true // Generate cryptographic execution proof
      });
      
      // Get and verify execution signature
      const sig = await PromptSig.verify(executionResult.signature);
      setExecutionSig(sig.id);
      setResult(executionResult.finalOutput);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Execution failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="prompt-asset-execution">
      <button 
        onClick={createAndExecutePromptAsset} 
        disabled={isLoading || !publicKey}
      >
        {isLoading ? 'Processing...' : 'Create & Execute Prompt Asset'}
      </button>
      
      {error && <div className="error">{error}</div>}
      
      {assetId && (
        <div className="asset-info">
          <h3>Prompt Asset Created:</h3>
          <p>Asset ID: {assetId}</p>
          <p>Verified Execution: {executionSig}</p>
        </div>
      )}
      
      {result && (
        <div className="result">
          <h3>Execution Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default PromptAssetComponent;`
    },
    {
      id: 'rust',
      label: 'Rust',
      language: 'rust',
      code: `// Using Rust to interact with PromptHub's prompt asset protocol
use anchor_client::{
    solana_sdk::{signature::{Keypair, read_keypair_file}, pubkey::Pubkey},
    Client, Program
};
use prompthub_protocol::{PromptVaultProgram, PromptAsset, LicenseType, PromptSig};
use std::rc::Rc;
use std::str::FromStr;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load wallet keypair
    let keypair = read_keypair_file("path/to/keypair.json")?;
    let wallet = Rc::new(keypair);
    
    // Connect to Solana network
    let client = Client::new_with_options(
        anchor_client::Cluster::Mainnet,
        wallet.clone(),
        anchor_client::CommitmentConfig::processed(),
    );
    
    // Connect to PromptVault program
    let program_id = Pubkey::from_str("promptvault1111111111111111111111111111111")?;
    let program = client.program(program_id);
    
    // Create PromptVault client for on-chain asset operations
    let prompt_vault = PromptVaultProgram::new(program);
    
    // Prepare prompt asset data with versioning and monetization
    let prompt_asset = PromptAsset {
        name: "Legal Contract Analyzer".to_string(),
        description: "Expert system for contract clause identification and risk assessment".to_string(),
        content: "Review the following contract and identify key clauses and potential risks:\n{{contract_text}}".to_string(),
        variables: vec![
            Variable { 
                name: "contract_text".to_string(), 
                description: Some("Full contract text to analyze".to_string()),
                required: true 
            }
        ],
        tags: vec!["legal".to_string(), "contract-analysis".to_string()],
        license: LicenseType::TokenGated {
            token: "PHUBxyz123...".to_string(), // SPL token required for access
            min_balance: 50,                    // Minimum token balance required
        },
        fee: Some(3.75),                        // Fee in PHUB tokens per execution
        royalty_bps: 250,                       // 2.5% royalty on derivative works
        is_public: true,
        version: "1.0.0".to_string(),
    };
    
    // Register prompt as an on-chain asset
    let asset_id = prompt_vault.register_prompt_asset(prompt_asset)?;
    println!("Prompt asset registered, ID: {}", asset_id);
    
    // Mint as NFT for ownership and transfer rights
    let nft = prompt_vault.mint_asset_nft(
        asset_id.clone(),
        Some("Legal Contract Analyzer v1".to_string()),
        Some("ipfs://QmAbC123...".to_string()), // IPFS metadata
        None,
    )?;
    println!("Prompt NFT minted: {}", nft.mint);
    
    // Query on-chain asset details
    let asset = prompt_vault.get_prompt_asset(asset_id)?;
    println!("Asset name: {}", asset.name);
    println!("Creator: {}", asset.creator);
    println!("License type: {:?}", asset.license);
    println!("Royalty rate: {}%", asset.royalty_bps as f64 / 100.0);
    
    // Search for related assets in the prompt marketplace
    let similar_assets = prompt_vault.search_prompt_assets(
        Some("legal".to_string()),
        None,
        Some(5), // limit to 5 results
    )?;
    
    println!("Found {} similar prompt assets", similar_assets.len());
    
    Ok(())
}`
    }
  ];

  const [activeTab, setActiveTab] = useState(codeTabs[0].id);

  // Get the currently selected code example
  const getActiveCode = () => {
    return codeTabs.find(tab => tab.id === activeTab) || codeTabs[0];
  };

  // Syntax highlighting function
  const syntaxHighlight = (code: string, language: string) => {
    // First escape HTML special characters
    const escapedCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
    
    // Split code into lines for line-by-line processing
    const lines = escapedCode.split('\n');
    const processedLines: string[] = [];
    
    // Define language keywords
    const commonKeywords = {
      'python': ['import', 'from', 'def', 'class', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'finally', 'return', 'print', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'as'],
      'typescript': ['import', 'export', 'function', 'class', 'interface', 'type', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'try', 'catch', 'finally', 'return', 'new', 'this', 'async', 'await', 'extends', 'implements', 'true', 'false', 'null'],
      'rust': ['use', 'fn', 'struct', 'enum', 'trait', 'impl', 'pub', 'let', 'mut', 'if', 'else', 'match', 'for', 'while', 'loop', 'return', 'self', 'true', 'false']
    };
    
    // Get keyword list for current language
    const keywords = commonKeywords[language as keyof typeof commonKeywords] || [];
    
    // Helper function to check if text already contains span tags
    const hasSpanTag = (text: string): boolean => {
      return text.includes('<span') || text.includes('</span');
    };
    
    // Process code line by line
    for (let line of lines) {
      // Process comments (handle comments before other syntax)
      if ((language === 'python' && line.trim().startsWith('#')) ||
          ((language === 'typescript' || language === 'rust') && line.trim().startsWith('//'))) {
        processedLines.push(`<span class="comment">${line}</span>`);
        continue; // Skip further processing for comment lines
      }
      
      // Use tokenization to avoid incorrect matching of HTML tags
      const tokens: { text: string; type: string | null }[] = [];
      let currentToken = '';
      let inString = false;
      let stringQuote = '';
      let escaped = false;
      
      // Break the line into basic tokens - this ensures we don't apply highlighting within already processed tokens
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        // Handle string boundaries
        if ((char === '"' || char === "'") && !escaped) {
          if (!inString) {
            // Start a new string
            if (currentToken) {
              tokens.push({ text: currentToken, type: null });
              currentToken = '';
            }
            inString = true;
            stringQuote = char;
            currentToken += char;
          } else if (char === stringQuote) {
            // End the current string
            currentToken += char;
            tokens.push({ text: currentToken, type: 'string' });
            currentToken = '';
            inString = false;
            stringQuote = '';
          } else {
            // Different quote character inside a string
            currentToken += char;
          }
        } else {
          // Handle escape characters
          if (char === '\\' && !escaped) {
            escaped = true;
          } else {
            escaped = false;
          }
          
          // Process spaces and punctuation as delimiters when not in string mode
          if (!inString && (char === ' ' || char === '\t' || '()[]{},;:.'.includes(char))) {
            if (currentToken) {
              tokens.push({ text: currentToken, type: null });
              currentToken = '';
            }
            tokens.push({ text: char, type: null });
          } else {
            currentToken += char;
          }
        }
      }
      
      // Process the final token
      if (currentToken) {
        tokens.push({ text: currentToken, type: inString ? 'string' : null });
      }
      
      // Process numbers and keywords
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        
        // Skip already highlighted tokens
        if (token.type) continue;
        
        const text = token.text;
        
        // Numbers
        if (/^\d+(\.\d+)?$/.test(text)) {
          token.type = 'number';
          continue;
        }
        
        // Keywords
        if (keywords.includes(text)) {
          token.type = 'keyword';
          continue;
        }
        
        // Class names (capitalize first letter)
        if (/^[A-Z][a-zA-Z0-9_]*$/.test(text)) {
          token.type = 'class';
          continue;
        }
        
        // Function names (check if next non-whitespace token is a parenthesis)
        if (/^[a-zA-Z_]\w*$/.test(text)) {
          let j = i + 1;
          while (j < tokens.length && tokens[j].text.trim() === '') j++;
          
          if (j < tokens.length && tokens[j].text === '(') {
            token.type = 'function';
          }
        }
      }
      
      // Combine tokens back into a line
      let processedLine = '';
      for (const token of tokens) {
        if (token.type) {
          processedLine += `<span class="${token.type}">${token.text}</span>`;
        } else {
          processedLine += token.text;
        }
      }
      
      processedLines.push(processedLine);
    }
    
    return processedLines.join('\n');
  };

  return (
    <section className="code-example-section">
      {/* Add center glow effect */}
      <div className="glow-effect"></div>
      
      {/* Canvas-based particle effect, replacing original CSS particles */}
      <GridParticles 
        gridSize={25} 
        particleColor="rgba(0, 211, 217, 1.0)"
        particleCount={20}
      />
      
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Prompt Protocol</span>
          <h2>Transform Prompts into Productive Assets</h2>
          <p className="section-description">
            Create, register, and monetize AI prompts as programmable on-chain assets with PromptHub's protocol layer and trading system.
          </p>
        </div>

        <div className="code-card">
          <div className="code-tabs">
            {codeTabs.map(tab => (
              <button
                key={tab.id}
                className={`code-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="code-container">
            <pre className="code-block">
              <code className={`language-${getActiveCode().language}`}
                dangerouslySetInnerHTML={{ __html: syntaxHighlight(getActiveCode().code, getActiveCode().language) }}
              />
            </pre>
          </div>
        </div>

        <div className="code-features">
          <div className="feature">
            <h3>Cross-Language SDK Support</h3>
            <p>Python, TypeScript, JavaScript, Rust and other major languages</p>
          </div>
          <div className="feature">
            <h3>On-Chain Secure Storage</h3>
            <p>All prompts securely stored and verified on the Solana blockchain</p>
          </div>
          <div className="feature">
            <h3>Model-Agnostic Execution</h3>
            <p>Seamlessly execute the same prompt across multiple AI models</p>
          </div>
        </div>

        <div className="action-button-container">
          <a href="/developers" className="action-button">View Developer Docs</a>
          <a href="/examples" className="action-button secondary">Browse Sample Projects</a>
        </div>
      </div>
    </section>
  );
};

export default CodeExampleSection; 