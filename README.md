# Salesforce DX Project: Despliegues con comandos:
## con check Only
sfdx force:source:deploy -c -u Ambiente01 -x manifest/parte3.xml --testlevel RunSpecifiedTests -r SendFileControllerTest

## sin check Only para deploy
sfdx force:source:deploy -u Ambiente01 -x manifest/parte3.xml --testlevel RunSpecifiedTests -r SendFileControllerTest

# TestLevel:

. --testlevel NoTestRun
. --testlevel RunLocalTests
. --testlevel RunAllTests
. --testlevel RunSpecifiedTests -r SendFileControllerTest
