@echo off

set LINKROOT=%~dp0

echo %LINKROOT%

del "%LINKROOT%..\prod\arnav.js"
del "%LINKROOT%..\prod\shell.css"

copy "%LINKROOT%..\lib\css\shell.css" "%LINKROOT%..\prod\"

if not exist "%LINKROOT%..\prod\img" md "%LINKROOT%..\prod\img"
copy "%LINKROOT%..\lib\img\whicons\*.*" "%LINKROOT%..\prod\img"

type "%LINKROOT%..\lib\js\utils.js"       > "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\domutils.js"   >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\status.js"     >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\issue.js"      >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\arnavtype.js"  >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\bureaucrat.js" >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\cfg.js"        >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\control.js"    >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\area.js"       >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\page.js"       >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\doc.js"        >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\toctree.js"    >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\framelet.js"   >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\console.js"    >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\burger.js"     >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\strip.js"      >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\figimg.js"     >> "%LINKROOT%..\prod\arnav.js"
type "%LINKROOT%..\lib\js\app.js"        >> "%LINKROOT%..\prod\arnav.js"

