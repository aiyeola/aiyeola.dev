#!/usr/bin/env node
const fs = require('fs');
const querystring = require('querystring');

// Manually load .env.local
const envPath = '.env.local';
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      process.env[key] = value;
    }
  });
}

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

async function testSpotify() {
  console.log('\n🎵 Testing Spotify Integration...\n');

  // Check if credentials are set
  console.log('✅ Credentials Check:');
  console.log(`   Client ID: ${client_id ? '✓ Set' : '✗ Missing'}`);
  console.log(`   Client Secret: ${client_secret ? '✓ Set' : '✗ Missing'}`);
  console.log(`   Refresh Token: ${refresh_token ? '✓ Set' : '✗ Missing'}\n`);

  if (!client_id || !client_secret || !refresh_token) {
    console.error('❌ Missing required Spotify credentials in .env.local\n');
    return;
  }

  try {
    // Test token refresh
    console.log('🔄 Testing token refresh...');
    const tokenResponse = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('❌ Token refresh failed!');
      console.error('   Status:', tokenResponse.status, tokenResponse.statusText);
      console.error('   Error:', tokenData.error);
      console.error('   Description:', tokenData.error_description);
      console.log('\n🔧 What to do:');
      console.log('   1. Your refresh token has expired or is invalid');
      console.log('   2. You need to re-authenticate with Spotify');
      console.log('   3. Follow these steps to get a new refresh token:');
      console.log('      a. Go to: https://developer.spotify.com/dashboard');
      console.log('      b. Select your app');
      console.log('      c. Go to Settings and note your Client ID and Client Secret');
      console.log('      d. Add this redirect URI: http://localhost:3000/callback');
      console.log('      e. Use this URL to authorize (replace CLIENT_ID):');
      console.log('         https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-currently-playing');
      console.log('      f. After authorizing, you\'ll get a code in the URL');
      console.log('      g. Exchange the code for a refresh token using curl or Postman\n');
      return;
    }

    console.log('✅ Token refresh successful!');
    console.log(`   Access token obtained: ${tokenData.access_token.substring(0, 20)}...\n`);

    // Test now playing endpoint
    console.log('🎵 Testing currently playing endpoint...');
    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (nowPlayingResponse.status === 204) {
      console.log('⚠️  No music is currently playing');
      console.log('   Play something on Spotify and try again!\n');
      return;
    }

    if (!nowPlayingResponse.ok) {
      console.error('❌ Now playing request failed!');
      console.error('   Status:', nowPlayingResponse.status, nowPlayingResponse.statusText);
      const errorData = await nowPlayingResponse.json().catch(() => ({}));
      console.error('   Error:', errorData);
      return;
    }

    const song = await nowPlayingResponse.json();

    console.log('✅ Now playing data retrieved successfully!\n');
    console.log('🎶 Currently Playing:');
    console.log(`   Track: ${song.item?.name || 'N/A'}`);
    console.log(`   Artist: ${song.item?.artists?.map(a => a.name).join(', ') || 'N/A'}`);
    console.log(`   Album: ${song.item?.album?.name || 'N/A'}`);
    console.log(`   Playing: ${song.is_playing ? '▶️  Yes' : '⏸️  Paused'}`);
    console.log(`   Type: ${song.currently_playing_type}\n`);

    console.log('✅ All tests passed! Your Spotify integration is working correctly.\n');

  } catch (error) {
    console.error('❌ Error during testing:');
    console.error('   ', error.message);
    console.error('\n   Full error:', error, '\n');
  }
}

testSpotify();
