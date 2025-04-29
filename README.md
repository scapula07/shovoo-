# Shovoo!

## Content
1. [Overview](#overview)
2. [Features](#features)
3. [How to Create Media Automations in Shovoo! - Step-by-Step](#how-to-create-media-automations-in-shovoo---step-by-step)
4. [Managing Your Automations](#managing-your-automations)
5. [Troubleshooting](#troubleshooting)

## Overview
**Shovoo!** is a no-code, web-based application with a drag-and-drop interface, enabling users to create workflows for media automation easily.  
This milestone focuses on CMS integration and advanced image-specific tasks, such as bulk background replacement and batch editing.  
Users can set up triggers, schedule automations, or batch process tasks effortlessly, without writing a single line of code.

## Features
- **Shopify Integration**: Seamlessly connect your Shopify store to automate media tasks on your product images.
- **Drag-and-Drop, Graphical Node UI**: Build workflows visually using a ComfyUI-like interface with nodes and connectors.
- **Built-in Image Editing Tools**: Crop, resize, apply filters, add text overlays, and replace backgrounds in bulk.
- **Livepeer AI Pipelines**: Integrate powerful AI features including:
  - Image-to-Image
  - Image-to-Text
  - Text-to-Image
- **Flexible Automation Options**:
  - Trigger-based automations (event-driven)
  - Scheduler-based automations (time-driven)
  - Batch processing (bulk-driven)

## How to Create Media Automations in Shovoo! - Step-by-Step

### Step 1: Access the Shovoo! Platform
Visit [https://www.shovoo.app](https://shovool.vercel.app/). Create an account or log in with your existing credentials.

### Step 2: Connect CMS or Shopify Store
Navigate to the **Integrations** panel and connect your CMS or Shopify store by authorizing access.

### Step 3: Build Your Workflow
- Open the **Workflow Builder**.
- Drag and drop nodes for tasks like "Fetch Images," "Crop," "Background Replace," or "Upload to CMS."
- Configure each node’s parameters (e.g., image dimensions, background color, AI model selection).

### Step 4: Set Triggers or Schedulers
- Choose how the automation should run:
  - Trigger on new uploads
  - Schedule daily, weekly, or monthly runs
  - Manually batch process selected assets

### Step 5: Test and Launch
Preview the workflow on sample images before going live.  
Activate the workflow once satisfied with the setup.

## Managing Your Automations

- **Dashboard Metrics**: Monitor the status of automations, task queues, and error logs from the main dashboard.
- **Editing a Workflow**: Pause any workflow, edit the task nodes, and resume without starting from scratch.
- **Batch History**: Review the history of batch runs, including success rates and failed operations for debugging.

## Troubleshooting

### Issue: Workflow stuck on a node
- **Possible Cause**: Invalid file formats or CMS authentication issues.
- **Solution**: Check node settings and ensure proper CMS/API credentials.

### Issue: Automation trigger not firing
- **Possible Cause**: CMS webhook might not be properly set or permissions might be missing.
- **Solution**: Reconnect your integration and verify webhook permissions.

### Issue: Livepeer AI task failing
- **Possible Cause**: API limits or model unavailability.
- **Solution**: Retry after a few minutes or check your usage quota.

---

Need more help?  
Contact us at **support@shovoo.app** with your workflow ID.
