# Livepeer Gateway wizard[GWID]

## Content
1. Overview
2. Features

### Overview
GWID is a simple UI launcher that enables single-button-click deployment and auto-scaling for the Livepeer stack, focusing on Gateway (Transcoding and AI) on any cloud provider.



### Features
1. Multi-cloud deployment:deploy on multiple cloud providers (AWS, Google Cloud, Azure) or even on-premise setups.
2. Management Tools: Metrics dashboard and funding web portal for Gateway
3. Preloaded templates with common settings for transcoding Options Configuration
4. Web shell interface to interact with Livepeer cli


### How to deploy a gateway on GWID - step-by-step
Step 1: Access the GWID Platform at https://www.gwid.io/. Create an account on the platform by requesting access from our support team gwidhq@gmail.com.

Step 2: Select Deployment Type. Choose Transcoding Gateway or AI Gateway depending on your use case.

Step 3: Configure Gateway Settings.

Select the desired Cloud Provider (AWS, GCP, or Azure).

Region: Select the preferred cloud region.

Select a Transcoding profiles or profiles

Enter a Gateway name, Arbitrum RPC endpoint and a passphrase/password


Step 4: Generate an ETH account using the web interactive terminal shell.Enter a passphrase to unlock your ETH account.

Step 5: Fund your Gateway ETH address with Arbitrum ETHER using the funding web panel to deposit and allocate ETH fund.

Step 6: Testing & Verification. Use the provided Node Endpoint/IP to publish a test stream.


### Managing Your Gateway

1. Real-time Metrics : View metrics such as resource usage (CPU and memory) ,  and funding balance in the GWID dashboard.
2. Funding the Gateway: Use the Funding Panel in the GWID UI to deposit funds. Allocate funds directly from your connected wallet.
3. Terminating a Gateway: Navigate to the Terminate panel to shut down a specific gateway instance. Ensure you withdraw any remaining funds before termination.


### Troubleshooting

1. Deployment Issues
    Issue: Gateway stuck in "Deploying... or initializing..."
    🔹 Might be due to resources limit.
    
    🔹 Send us an email with your gateway id and name at gwidhq@gmail.com.

