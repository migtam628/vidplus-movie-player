# Security Policy

## Supported versions

Security fixes are targeted at the latest published release.

## Reporting a vulnerability

Please do not publish exploitable security details in a public issue. Contact the repository owner privately through an appropriate GitHub contact channel and include a concise reproduction, affected versions, impact, and suggested mitigation when available.

## Scope

This package constructs VidUp iframe URLs and renders iframe wrappers. It does not proxy video traffic, resolve direct media URLs, store streaming credentials, host media, or control VidUp infrastructure.

Security issues in this wrapper are in scope. Issues that exist entirely in VidUp or another third-party service should also be reported to the relevant service operator.

## Third-party iframe boundary

VidUp is loaded as a third-party iframe from `https://vidup.to`. Applications embedding it should review their own Content Security Policy, privacy requirements, referrer policy, and third-party-content risk model.
