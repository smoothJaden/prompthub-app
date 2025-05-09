# PromptHub App

<div align="center">
  <img src="https://pbs.twimg.com/profile_banners/1916101667487117312/1745677140/1500x500" alt="PromptHub Logo" width="1500"/>
  <h3>Frontend Application and User Interface</h3>

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/react-18.0%2B-blue.svg)](https://reactjs.org/)
  [![Next.js](https://img.shields.io/badge/next.js-13.0%2B-lightgrey.svg)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/typescript-5.0%2B-blue.svg)](https://www.typescriptlang.org)
</div>

## 📋 Overview

`prompthub-app` is the frontend application for the PromptHub ecosystem, providing an intuitive and feature-rich user interface that enables users to create, test, share, discover, and monetize AI prompts. The application is a modern web app built with React and Next.js, built on top of the PromptHub protocol and SDK.

As described in the [PromptHub Whitepaper](../PromptHub_Whitepaper.md), this application serves as the primary entry point for users to interact with the PromptHub ecosystem, implementing the user experience vision outlined in the whitepaper.

## 🏗️ Architecture

The PromptHub application uses a modern frontend architecture based on React, Next.js, and TypeScript:

```
prompthub-app/
├── public/                     # Static assets
├── src/                        # Source code
│   ├── components/             # React components
│   │   ├── common/             # Shared UI components
│   │   ├── layouts/            # Page layout components
│   │   ├── marketplace/        # Marketplace-related components
│   │   ├── prompt-editor/      # Prompt editor components
│   │   ├── dag-builder/        # DAG builder components
│   │   └── execution-console/  # Execution console components
│   ├── pages/                  # Next.js page routes
│   ├── styles/                 # Style files
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Utility functions
│   ├── services/               # API services
│   ├── store/                  # Global state management
│   └── types/                  # TypeScript type definitions
├── .eslintrc.js                # ESLint configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## 🧩 Core Components

### Prompt Editor

Interactive environment for prompt creation and editing:

- **DSL Syntax Highlighting**: Syntax highlighting for PromptDSL syntax
- **Real-time Validation**: Immediate feedback on syntax errors and best practice suggestions
- **Variable Management**: Easy definition and management of prompt variables
- **Template Features**: Prompt templates based on common use cases
- **Version Control**: Track and manage prompt version history

```tsx
import { PromptEditor } from '@/components/prompt-editor';
import { usePromptState } from '@/hooks/usePromptState';

const CreatePromptPage = () => {
  const { promptState, updatePrompt, validatePrompt } = usePromptState();

  return (
    <div className="create-prompt-container">
      <h1>Create New Prompt</h1>
      <PromptEditor
        value={promptState.content}
        onChange={updatePrompt}
        onValidate={validatePrompt}
      />
      {promptState.validationErrors.map(error => (
        <div className="error-message" key={error.id}>
          {error.message}
        </div>
      ))}
      <div className="action-buttons">
        <button onClick={handleSaveDraft}>Save Draft</button>
        <button 
          onClick={handlePublish}
          disabled={promptState.validationErrors.length > 0}
        >
          Publish
        </button>
      </div>
    </div>
  );
};
```

### DAG Builder

Interface for visually designing prompt workflows:

- **Drag-and-Drop Interface**: Intuitive design of DAG workflows
- **Node Configuration**: Configure parameters and options for each node
- **Edge Management**: Define data flow between nodes
- **Real-time Validation**: Validate workflow logic and rules
- **Import/Export**: Support for serialization in standard formats

```tsx
import { DAGBuilder } from '@/components/dag-builder';
import { useDAGState } from '@/hooks/useDAGState';

const DAGEditorPage = () => {
  const { 
    dag,
    nodes,
    edges,
    onNodeAdd,
    onNodeRemove,
    onEdgeCreate,
    onEdgeRemove,
    validateDAG
  } = useDAGState();

  return (
    <div className="dag-editor-container">
      <h1>Workflow Designer</h1>
      <div className="toolbox">
        <h3>Available Nodes</h3>
        <div className="node-templates">
          {/* Node templates */}
        </div>
      </div>
      <DAGBuilder
        nodes={nodes}
        edges={edges}
        onNodeAdd={onNodeAdd}
        onNodeRemove={onNodeRemove}
        onEdgeCreate={onEdgeCreate}
        onEdgeRemove={onEdgeRemove}
      />
      <div className="validation-panel">
        {validateDAG().map(error => (
          <div className="error-message" key={error.id}>
            {error.message}
          </div>
        ))}
      </div>
      <div className="action-buttons">
        <button onClick={handleExportDAG}>Export Workflow</button>
        <button onClick={handleSaveDAG}>Save Workflow</button>
      </div>
    </div>
  );
};
```

### Marketplace

Marketplace interface for discovering, buying, and selling prompts:

- **Browse and Search**: Discover and filter available prompts
- **Detail Pages**: Deep dive into prompt details, ratings, and reviews
- **Purchase Flow**: Seamless license purchase and payment process
- **Sales Management**: Track sales and revenue data
- **Ratings and Reviews**: Community feedback and quality metrics

```tsx
import { PromptCard } from '@/components/marketplace/PromptCard';
import { SearchFilters } from '@/components/marketplace/SearchFilters';
import { useMarketplace } from '@/hooks/useMarketplace';

const MarketplacePage = () => {
  const { 
    prompts, 
    filters, 
    updateFilters, 
    isLoading, 
    hasMore, 
    loadMore 
  } = useMarketplace();

  return (
    <div className="marketplace-container">
      <h1>Prompt Marketplace</h1>
      <SearchFilters 
        filters={filters} 
        onChange={updateFilters} 
      />
      <div className="prompt-grid">
        {prompts.map(prompt => (
          <PromptCard 
            key={prompt.id} 
            prompt={prompt} 
            onView={() => router.push(`/marketplace/${prompt.id}`)}
          />
        ))}
        {isLoading && <div className="loading-indicator">Loading...</div>}
      </div>
      {hasMore && (
        <button onClick={loadMore} disabled={isLoading}>
          Load More
        </button>
      )}
    </div>
  );
};
```

### Execution Console

Real-time environment for testing and executing prompts:

- **Variable Input**: Configure runtime variables and parameters
- **Model Selection**: Choose the model to execute the prompt
- **Real-time Execution**: Immediately see results and performance
- **History**: Save and compare multiple executions
- **Export Results**: Download results in various formats

```tsx
import { ExecutionConsole } from '@/components/execution-console';
import { useExecution } from '@/hooks/useExecution';

const TestPromptPage = () => {
  const { 
    prompt, 
    variables, 
    updateVariable, 
    selectedModel, 
    setModel, 
    executePrompt, 
    result, 
    isExecuting, 
    executionHistory 
  } = useExecution();

  return (
    <div className="test-prompt-container">
      <h1>Test Prompt</h1>
      <div className="prompt-info">
        <h2>{prompt.title}</h2>
        <p>{prompt.description}</p>
      </div>
      <div className="configuration-panel">
        <h3>Variables</h3>
        {variables.map(variable => (
          <div key={variable.name} className="variable-input">
            <label>{variable.name}</label>
            <input
              type="text"
              value={variable.value}
              onChange={e => updateVariable(variable.name, e.target.value)}
            />
          </div>
        ))}
        <h3>Model Settings</h3>
        <select 
          value={selectedModel} 
          onChange={e => setModel(e.target.value)}
        >
          <option value="gpt-4">GPT-4</option>
          <option value="claude-2">Claude 2</option>
          <option value="gemini-pro">Gemini Pro</option>
        </select>
      </div>
      <ExecutionConsole
        result={result}
        isExecuting={isExecuting}
        onExecute={executePrompt}
        executionHistory={executionHistory}
      />
    </div>
  );
};
```

## 🛠️ Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (16.x or higher)
- [npm](https://www.npmjs.com/) (8.x or higher)
- [Git](https://git-scm.com/)

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/prompthub/prompthub-app.git
cd prompthub-app
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file and add the necessary environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_INDEXER_URL=http://localhost:8000/graphql
NEXT_PUBLIC_WALLET_ADAPTER_NETWORK=devnet
```

4. Start the development server

```bash
npm run dev
```

The application will run at [http://localhost:3000](http://localhost:3000).

## 📚 Usage Examples

### Creating and Publishing Prompts

```tsx
import { useState } from 'react';
import { PromptEditor } from '@/components/prompt-editor';
import { usePromptHub } from '@/hooks/usePromptHub';

const CreatePromptDemo = () => {
  const [promptContent, setPromptContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { createPrompt } = usePromptHub();

  const handlePublish = async () => {
    try {
      const result = await createPrompt({
        title,
        description,
        content: promptContent,
        isPublic: true,
        license: 'MIT',
        price: 0 // Free prompt
      });
      
      console.log('Prompt published:', result);
      // Navigate to prompt details page
    } catch (error) {
      console.error('Publishing failed:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Prompt title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      
      <textarea
        placeholder="Prompt description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      
      <PromptEditor
        value={promptContent}
        onChange={setPromptContent}
      />
      
      <button onClick={handlePublish}>
        Publish Prompt
      </button>
    </div>
  );
};
```

### Creating DAG Workflows

```tsx
import { DAGBuilder } from '@/components/dag-builder';
import { usePromptHub } from '@/hooks/usePromptHub';
import { useState } from 'react';

const DAGWorkflowDemo = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [workflowName, setWorkflowName] = useState('');
  const { createDAG, getUserPrompts } = usePromptHub();
  const [availablePrompts, setAvailablePrompts] = useState([]);

  // Load user's prompts to use as nodes
  useEffect(() => {
    const loadPrompts = async () => {
      const prompts = await getUserPrompts();
      setAvailablePrompts(prompts);
    };
    loadPrompts();
  }, []);

  const handleAddNode = prompt => {
    setNodes([
      ...nodes,
      {
        id: `node-${Date.now()}`,
        type: 'promptNode',
        data: { prompt },
        position: { x: 100, y: 100 }
      }
    ]);
  };

  const handleSaveWorkflow = async () => {
    try {
      const result = await createDAG({
        name: workflowName,
        nodes,
        edges,
        isPublic: true
      });
      
      console.log('Workflow saved:', result);
    } catch (error) {
      console.error('Saving workflow failed:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Workflow name"
        value={workflowName}
        onChange={e => setWorkflowName(e.target.value)}
      />
      
      <div className="available-prompts">
        <h3>Available Prompts</h3>
        {availablePrompts.map(prompt => (
          <div 
            key={prompt.id}
            className="prompt-node-template"
            onClick={() => handleAddNode(prompt)}
          >
            {prompt.title}
          </div>
        ))}
      </div>
      
      <DAGBuilder
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
      />
      
      <button onClick={handleSaveWorkflow}>
        Save Workflow
      </button>
    </div>
  );
};
```

### Browsing the Marketplace

```tsx
import { useEffect, useState } from 'react';
import { usePromptHub } from '@/hooks/usePromptHub';

const MarketplaceDemo = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const { searchMarketplace } = usePromptHub();

  useEffect(() => {
    const searchPrompts = async () => {
      setLoading(true);
      try {
        const results = await searchMarketplace({
          query: searchTerm,
          category: category !== 'all' ? category : undefined,
          page: 1,
          limit: 20
        });
        setPrompts(results.items);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    searchPrompts();
  }, [searchTerm, category]);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="writing">Writing</option>
          <option value="coding">Coding</option>
          <option value="creative">Creative</option>
          <option value="business">Business</option>
        </select>
      </div>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="prompts-grid">
          {prompts.map(prompt => (
            <div key={prompt.id} className="prompt-card">
              <h3>{prompt.title}</h3>
              <p>{prompt.description}</p>
              <div className="prompt-meta">
                <span>{prompt.author}</span>
                <span>{prompt.price > 0 ? `$${prompt.price}` : 'Free'}</span>
                <span>⭐ {prompt.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

## 🔄 PromptHub Integration

### SDK Integration

```tsx
import { useEffect, useState } from 'react';
import { PromptHubClient } from '@prompthub/sdk';

const usePromptHubSDK = () => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const initClient = async () => {
      const client = new PromptHubClient({
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
        indexerUrl: process.env.NEXT_PUBLIC_INDEXER_URL
      });
      
      try {
        // Check for saved session
        if (localStorage.getItem('prompthub_token')) {
          await client.restoreSession();
        }
        
        const userInfo = await client.getCurrentUser();
        setCurrentUser(userInfo);
        setIsConnected(true);
      } catch (error) {
        console.error('Connection failed:', error);
        setIsConnected(false);
      }
      
      setClient(client);
    };
    
    initClient();
  }, []);

  const connectWallet = async () => {
    if (!client) return;
    
    try {
      await client.connectWallet();
      const userInfo = await client.getCurrentUser();
      setCurrentUser(userInfo);
      setIsConnected(true);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  return {
    client,
    isConnected,
    currentUser,
    connectWallet
  };
};
```

### Protocol Contract Integration

```tsx
import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PromptVaultProgram } from '@prompthub/sdk';

const usePromptVault = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [promptVault, setPromptVault] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initPromptVault = async () => {
      if (!wallet.connected) {
        setIsLoading(false);
        return;
      }
      
      try {
        const vault = new PromptVaultProgram(
          connection,
          wallet.publicKey.toString()
        );
        
        await vault.initialize();
        setPromptVault(vault);
      } catch (error) {
        console.error('PromptVault initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initPromptVault();
  }, [wallet.connected, connection]);

  const registerPrompt = async (promptData) => {
    if (!promptVault || !wallet.connected) {
      throw new Error('PromptVault not initialized or wallet not connected');
    }
    
    try {
      const transaction = await promptVault.createRegisterPromptTransaction(promptData);
      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      
      return signature;
    } catch (error) {
      console.error('Prompt registration failed:', error);
      throw error;
    }
  };

  return {
    promptVault,
    isLoading,
    registerPrompt
  };
};
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please check out our [Contributing Guidelines](CONTRIBUTING.md) for more details.

---

For more information, please refer to the [PromptHub Whitepaper](../PromptHub_Whitepaper.md) or join our [Discord community](https://discord.gg/prompthub). 
