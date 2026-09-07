# GitHub Access / Manual Upload Note

At the time v0.1.1 was prepared, the ChatGPT GitHub connection could read `KhaemenesAcademy/Account-Cloud.github.io` but still reported `push:false` even after the KhaemenesAcademy GitHub App installation was changed to all repositories.

Therefore v0.1.1 is intentionally packaged for a manual GitHub upload.

## Manual publish rule

Extract the ZIP locally and upload the **contents inside** the `Khaemenes_Account_Cloud_v0.1.1` folder to the root of `KhaemenesAcademy/Account-Cloud.github.io`.

Do not upload real family/student data, secrets, credentials, browser vault contents, or production configuration.

After upload, verify the repository tree against `SHA256SUMS.txt`.
