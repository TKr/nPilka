help:
	@echo " help - show this"
	@echo " serve - run dev server"
	@echo " prod - build prod (optimized) version"

serve:
	./ng serve --base-href=/

prod:
	./ng build --prod --aot --buildOptimizer --base-href=/
#	./ng build --env=prod --prod --aot --buildOptimizer --no-sourcemaps --base-href=/

