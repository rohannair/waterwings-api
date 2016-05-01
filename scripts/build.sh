#!/bin/bash -e

umask 0002
export PATH=/usr/local/bin:$PATH

PROJECT=waterwings-api
ARTIFACT_DIR=/opt/artifacts
LATEST_FILE=${PROJECT}-latest
FILES_TO_INCLUDE="."
FILES_TO_DELETE="node_modules"

usage () {
  echo "Usage: $0 options (-bt) -a artifact_file -h for help";
  echo "E.g. $0 -b -t -a ${PROJECT}-2016-05-01_02:16:11-081f50931d7326ce94c1ccc9152c26f10a902825.tar.bz2"
  echo
}

if ( ! getopts "bta:h" opt )
then
  usage
  exit 1;
fi

TEST=no
BUILD=no
while getopts "bta:h" opt; do
  case $opt in
    b) BUILD=yes;;
    t) TEST=yes;;
    a) ARTIFACT_FILE=$OPTARG;;
    h) usage ; exit 0 ;;
  esac
done

if [ x$ARTIFACT_FILE == x ]
then
  usage
  exit 2
fi

npm cache clean
npm install

if [ x$BUILD == xyes ]
then
  npm run test
else
  echo
  echo "We were told to skip testing this project."
  echo
fi

if [ x$BUILD == xyes ]
then
  npm run build
else
  echo
  echo "We were told to skip building this project."
  echo
fi

ARTIFACT_PATH=${ARTIFACT_DIR}/${ARTIFACT_FILE}

# Pack FILES_TO_INCLUDE and copy the artifact somewhere
echo
echo "Creating artifact at ${ARTIFACT_PATH}, including ${FILES_TO_INCLUDE} there"
tar cjf ${ARTIFACT_PATH} ${FILES_TO_INCLUDE}

# Keep a record of what the latest artifact is:
echo
echo "Depositing latest artifact name into ${ARTIFACT_DIR}/${LATEST_FILE}"
LATEST_FILE_TMP=$(mktemp)
echo ${ARTIFACT_FILE} > ${LATEST_FILE_TMP}
chmod ugo+r ${LATEST_FILE_TMP}
mv ${LATEST_FILE_TMP} ${ARTIFACT_DIR}/${LATEST_FILE}

# Clean up FILES_TO_DELETE
echo
echo "Cleaning up ${FILES_TO_DELETE}"
rm -rf ${FILES_TO_DELETE}
