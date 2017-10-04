.PHONY: release
release: | clean build dist

.PHONY: build
build: | node_modules shared
	node_modules/.bin/tsc

.PHONY: watch
watch: shared
	node_modules/.bin/tsc -w

.PHONY: start
start:
	npm start

.PHONY: clean
clean:
	rm -rf build || true
	rm -rf node_modules || true
	rm -rf dist || true

node_modules:
	npm i

.PHONY: shared
shared:
	mkdir build || true
	cp src/index.html build/index.html
	node_modules/.bin/lessc src/styles.less build/styles.css

.PHONY: dist
dist: dist-linux dist-mac dist-win

.PHONY: dist-linux
dist-linux:
	npm run dist-linux

.PHONY: dist-mac
dist-mac:
	npm run dist-mac

.PHONY: dist-win
dist-win:
	npm run dist-win