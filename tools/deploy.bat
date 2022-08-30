@echo off

set ARDEPLROOT=%~dp0

call "%ARDEPLROOT%link.bat"
rem copy "%ARDEPLROOT%..\prod\shell.css"  C:\privat\misha\webhelp\plugins\common\front\css\
copy "%ARDEPLROOT%..\prod\arnav.js"   C:\privat\misha\webhelp\plugins\common\front\js\

copy "%ARDEPLROOT%..\prod\img\*.*"    C:\privat\misha\webhelp\plugins\common\front\img\