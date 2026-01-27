# Tdarr Scanner Bug Fix - Docker Overlay
#
# This Dockerfile patches the Tdarr server to fix TypeError crashes during library scanning.
#
# BUGS FIXED:
#   - TypeError: Cannot read properties of undefined (reading 'containerFilter')
#   - TypeError: Cannot read properties of undefined (reading 'on')
#   - TypeError: k.split is not a function
#
# ROOT CAUSES:
#   1. Missing null check after getById() - library may not exist in database
#   2. Property name varies between versions (containerFilter vs allowedContainers)
#   3. foldersToIgnore can be stored as array OR comma-separated string
#   4. Missing null coalescing in array iteration loops
#
# USAGE:
#   cd fix/
#   docker build -t tdarr-fixed .
#   # Then use tdarr-fixed instead of haveagitgat/tdarr in your docker-compose
#
# See: https://github.com/HaveAGitGat/Tdarr/pull/1311

FROM haveagitgat/tdarr:2.58.02

# Copy patched scanner files
COPY Tdarr_Server/srcug/fileScanners.js /app/Tdarr_Server/srcug/fileScanners.js
COPY Tdarr_Server/srcug/commonModules/fileScanner/fileScanner.js /app/Tdarr_Server/srcug/commonModules/fileScanner/fileScanner.js

# Ensure correct permissions
RUN chmod 755 /app/Tdarr_Server/srcug/fileScanners.js \
    && chmod 755 /app/Tdarr_Server/srcug/commonModules/fileScanner/fileScanner.js
