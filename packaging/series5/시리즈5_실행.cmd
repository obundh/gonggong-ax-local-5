@echo off
setlocal
cd /d "%~dp0"

set "SERIES5_EXE=%~dp0GonggongAX-Series5-Resource-Extractor.exe"

if not exist "%SERIES5_EXE%" (
  echo Series 5 executable was not found in this folder.
  echo Extract every file from the downloaded ZIP, then try again.
  pause
  exit /b 1
)

if /I "%~1"=="--smoke-test" goto smoke_test

start "" "%SERIES5_EXE%" %*
if errorlevel 1 (
  echo Series 5 could not be started.
  pause
  exit /b 1
)

endlocal
exit /b 0

:smoke_test
"%SERIES5_EXE%" %*
exit /b %ERRORLEVEL%
