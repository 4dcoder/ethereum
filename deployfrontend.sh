rsync -r ChainList/build_webpack/ docs/
rsync ChainList/build/contracts/ChainList.json docs/
git add .
git commit -m "Adding frontend files to Github Pages"
git push
