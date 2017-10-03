release: | clean build
	npm run dist-linux && \
	npm run dist-mac && \
	npm run dist-win

build: shared
	node_modules/.bin/tsc

watch: shared
	node_modules/.bin/tsc -w

.PHONY: clean
clean:
	rm -rf build || true
	rm -rf node_modules || true

shared:
	npm i
	mkdir build || true
	cp src/index.html build/index.html
	node_modules/.bin/lessc src/styles.less build/styles.css