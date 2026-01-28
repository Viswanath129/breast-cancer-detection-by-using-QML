@echo off
setlocal EnableDelayedExpansion

echo ----------------------------------------
echo       ANTIGRAVITY GITHUB PUBLISHER
echo ----------------------------------------

:: Check for Git in known locations
set "GIT_PATHS[0]=C:\Users\kasiv\AppData\Local\Programs\ExpressLRS Configurator\dependencies\windows_amd64\PortableGit\cmd\git.exe"
set "GIT_PATHS[1]=C:\Users\kasiv\AppData\Local\Programs\ExpressLRS Configurator\dependencies\windows_amd64\PortableGit\bin\git.exe"

set "TARGET_GIT="

for /L %%i in (0,1,1) do (
    set "TEST_PATH=!GIT_PATHS[%%i]!"
    if exist "!TEST_PATH!" (
        echo Found Git at: "!TEST_PATH!"
        "!TEST_PATH!" --version >nul 2>&1
        if !ERRORLEVEL! EQU 0 (
            set "TARGET_GIT=!TEST_PATH!"
            goto :FOUND
        )
    )
)

:FOUND
if not defined TARGET_GIT (
    echo ERROR: Could not find a working git.exe.
    pause
    exit /b 1
)

echo Using Git: "%TARGET_GIT%"

:: Re-add files just in case
"%TARGET_GIT%" add .
"%TARGET_GIT%" commit -m "Add all project files"

:: Update Remote URL to the one you created
echo Setting remote to: https://github.com/Viswanath129/breast-cancer-detection-by-using-QML.git
"%TARGET_GIT%" remote remove origin 2>nul
"%TARGET_GIT%" remote add origin https://github.com/Viswanath129/breast-cancer-detection-by-using-QML.git

echo.
echo PUSHING PROJECT FILES...
echo (This will overwrite the default README on GitHub with your local files)
echo.
"%TARGET_GIT%" push -u origin main --force

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo PUSH FAILED!
    pause
) else (
    echo.
    echo SUCCESS! All files have been pushed.
    pause
)
