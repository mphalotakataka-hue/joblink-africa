# JOBLINK AFRICA — Android-first starter app

This is a working **first prototype** designed for an Android phone. It is a Progressive Web App (PWA), so it can run in a mobile browser and may be added to the home screen when hosted over HTTPS.

## Features in this starter version
- Mobile-friendly home screen and navigation
- CV form with local-device saving
- CV print preview, where the browser can save/print as PDF
- Searchable example job listings (clearly marked DEMO)
- Employer vacancy submission saved locally on the same device
- Basic offline caching after the first successful load

## Important limitations
This version is a local prototype, not a public multi-user recruitment platform:
- CVs and employer-submitted vacancies stay in the browser's local storage on this device.
- A vacancy entered on one phone will not appear on another phone.
- Example vacancies are not live jobs.
- User-submitted vacancies are not verified or publicly distributed.
- There is no account system, cloud database, messaging, application tracking or administrator review yet.
- Do not enter identity numbers, bank details, passwords, or sensitive personal information.

A production release needs secure authentication, a shared database, access controls, backups, a vacancy review workflow, privacy notice and POPIA compliance review.

## Run it from an Android phone
The simplest phone-only route is to upload these files to a static HTTPS hosting service using its mobile website. For example:
1. Extract `joblink-africa-starter.zip` on your phone.
2. Create an account with a static hosting provider that supports uploading a folder or connecting a repository.
3. Upload the extracted project files, keeping the file names and folder structure unchanged.
4. Open the HTTPS website URL in Chrome.
5. Use Chrome's menu and choose **Add to Home screen** or **Install app** if offered.

The service may have free-tier limits and may require account verification. Do not enter payment details unless you understand the provider's pricing.

## Test locally
Open `index.html` in a browser to test the basic interface. PWA installation and service-worker offline caching require the site to be served from HTTPS (or localhost).

## Next development stage
Connect a secure backend such as Supabase:
- Authentication for job seekers and employers
- Database tables for profiles, vacancies and applications
- Row-level security so users only access permitted records
- Admin approval before a vacancy becomes public
- CV file storage with private access and deletion controls

## Safety and legal notes
Do not charge job seekers to access vacancies, apply for jobs or secure employment. Keep optional CV design services separate from recruitment or placement. Get appropriate South African legal advice before offering recruitment/placement services. Publish a clear privacy notice and handle personal information in line with POPIA.
