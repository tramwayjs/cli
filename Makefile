build:
	npm run build

pack:
	npm pack

test: pack
	rm -rf ./test && \
	mkdir ./test && \
	mv ./tramway-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz ./test/tramway-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz && \
	cd ./test && \
	npm init -y && \
	npm i -D tramway-$(shell git tag --sort=-v:refname | head -n 1 | sed 's/v//g').tgz && \
	./node_modules/.bin/tramway install && \
	cd ../