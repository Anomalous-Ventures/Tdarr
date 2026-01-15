FROM haveagitgat/tdarr:2.26.01

# Fix: Scanner null checks to prevent TypeError crashes
# Issues fixed:
# - TypeError: Cannot read properties of undefined (reading 'containerFilter')
# - TypeError: Cannot read properties of undefined (reading 'on')
# - TypeError: k.split is not a function
#
# Root cause: Missing null/undefined checks in fileScanners.js and fileScanner.js
# when accessing library configuration properties

COPY Tdarr_Server/srcug/fileScanners.js /app/Tdarr_Server/srcug/fileScanners.js
COPY Tdarr_Server/srcug/commonModules/fileScanner/fileScanner.js /app/Tdarr_Server/srcug/commonModules/fileScanner/fileScanner.js

RUN chmod 755 /app/Tdarr_Server/srcug/fileScanners.js \
    && chmod 755 /app/Tdarr_Server/srcug/commonModules/fileScanner/fileScanner.js
