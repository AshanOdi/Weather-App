# Weather App

A modern weather dashboard built with React, Vite and Tailwind CSS, powered by the
[OpenWeather](https://openweathermap.org/api) API and secured with Auth0.

## Features

- **Current conditions** with the city's live local time, feels-like, high/low and an animated icon
- **Smart tips**: umbrella reminders, clothing, heat, wind, fog and air quality advice
- **24-hour forecast** with an interactive temperature chart and rain chances
- **5-day forecast** with temperature range bars
- **Wind** compass with direction, gusts and Beaufort description
- **Sunrise & sunset** with a daylight progress arc
- **Air quality** index with PM2.5, PM10, O₃ and NO₂ levels
- **Highlights**: humidity & dew point, pressure, visibility, cloud cover, precipitation
- **City search** with autocomplete and **use my location**
- **Saved cities** you can add and remove, remembered between visits
- **°C / °F** toggle (wind, visibility and rain units switch too)
- Background that changes with the weather and time of day
- Responses cached for 5 minutes and refreshed automatically

## Getting started

```bash
npm install
npm run dev
```

Create a `.env` file in the project root:

```env
VITE_REACT_APP_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_REACT_APP_AUTH_CLIENT_ID=your-auth0-client-id
VITE_REACT_APP_AUTH_OPEN_WEATHER_API=your-openweather-api-key
```

All features use the free OpenWeather endpoints: current weather, 5 day / 3 hour
forecast, air pollution and geocoding.

## Tech stack

React 19 · Vite · Tailwind CSS v4 · Motion · React Router · Auth0 · Axios · React Icons

# 🌦️ Weather App – Secure Login with Auth0

This is a weather application secured with **Auth0 Authentication & Authorization**.  
The app requires users to log in before accessing weather data, and it is protected with **Multi-Factor Authentication (MFA)** for added security.

---

## 🔗 Live Demo

[Weather App on Netlify](https://gleeful-chebakia-eed366.netlify.app/)

---

## 🔐 Authentication Details

### Auth0 Test Login

- **Email:** careers@fidenz.com
- **Password:** Pass#fidenz

> ✨ Only pre-registered users can log in. Public sign-ups are disabled.

### MFA (Multi-Factor Authentication)

After login, users must complete MFA. Configured options:

- ✅ Email (one-time passcode)
- ✅ Auth0 Guardian Push Notification
- ✅ Recovery Codes

---

## 📌 Features

- 🌍 Fetches and displays real-time weather data.
- 🔒 Auth0 login/logout with protected routes.
- 🛡️ Multi-Factor Authentication (MFA) enabled for security.
- 🚫 Public sign-ups disabled – only authorized test users can access.
- ☁️ Deployed on Netlify.

---

## 🛠️ Technologies Used

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Auth:** Auth0 (Login, Logout, MFA, Session Handling)
- **Deployment:** Netlify

---

## 📂 Repository

Source Code: [GitHub Repository](https://github.com/AshanOdi/Weather-App.git)

---

## How to Run Locally

1. Open this link
   https://gleeful-chebakia-eed366.netlify.app/

2. Click Login

3. Enter Password and Email
   - Email: careers@fidenz.com
   - Password: Pass#fidenz

4. Choose Email

5. Enter the Code you received to careers@fidenz.com

6. In Verify section, Choose try another method
