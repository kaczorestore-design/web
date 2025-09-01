#!/usr/bin/env node

/**
 * Deployment Helper Script for AI Teleradiology Platform
 * This script helps with the Vercel deployment process
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function checkEnvironmentFiles() {
  const envExample = path.join(__dirname, '.env.example');
  const backendEnv = path.join(__dirname, 'backend', '.env');
  
  if (!fs.existsSync(envExample)) {
    log('❌ .env.example file not found!', 'red');
    return false;
  }
  
  log('✅ Environment example file found', 'green');
  return true;
}

function displayPreDeploymentChecklist() {
  log('\n📋 Pre-deployment Checklist:', 'cyan');
  log('\n1. ✅ Code is committed and pushed to GitHub');
  log('2. ✅ Database is set up (PostgreSQL recommended)');
  log('3. ✅ Cloudinary account is configured');
  log('4. ✅ Email service is configured');
  log('5. ✅ Environment variables are prepared');
  log('\n📖 Please refer to DEPLOYMENT.md for detailed instructions', 'yellow');
}

function displayDeploymentCommands() {
  log('\n🚀 Vercel Deployment Commands:', 'magenta');
  log('\n1. Deploy Backend (API):');
  log('   cd backend && vercel --prod', 'blue');
  
  log('\n2. Deploy Frontend (Main App):');
  log('   vercel --prod', 'blue');
  
  log('\n3. Deploy CMS (Admin Panel):');
  log('   cd cms && vercel --prod', 'blue');
}

function displayEnvironmentVariables() {
  log('\n🔧 Required Environment Variables:', 'yellow');
  
  const envContent = fs.readFileSync(path.join(__dirname, '.env.example'), 'utf8');
  const variables = envContent.split('\n')
    .filter(line => line.includes('=') && !line.startsWith('#'))
    .map(line => line.split('=')[0]);
  
  variables.forEach(variable => {
    log(`   ${variable}`, 'cyan');
  });
}

function main() {
  log('🏥 AI Teleradiology Platform - Vercel Deployment Helper', 'bright');
  log('=' .repeat(60), 'blue');
  
  // Check Vercel CLI
  if (!checkVercelCLI()) {
    log('\n❌ Vercel CLI not found!', 'red');
    log('Please install it: npm i -g vercel', 'yellow');
    process.exit(1);
  }
  log('✅ Vercel CLI is installed', 'green');
  
  // Check environment files
  if (!checkEnvironmentFiles()) {
    process.exit(1);
  }
  
  // Display information
  displayPreDeploymentChecklist();
  displayEnvironmentVariables();
  displayDeploymentCommands();
  
  log('\n📚 For detailed deployment instructions, see DEPLOYMENT.md', 'bright');
  log('\n🔗 Useful Links:', 'cyan');
  log('   • Vercel Dashboard: https://vercel.com/dashboard');
  log('   • Vercel Docs: https://vercel.com/docs');
  log('   • Supabase (Database): https://supabase.com');
  log('   • Cloudinary: https://cloudinary.com');
  
  log('\n✨ Happy deploying!', 'green');
}

// Run the main function when script is executed directly
main();

export { main };