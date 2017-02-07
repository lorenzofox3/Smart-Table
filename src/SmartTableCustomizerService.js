class SmartTableCustomizerService {
	constructor($filter) {
		this.$filter = $filter;
	}

	/**
	 customState: object to store smart table state / custom data (filter) for external (custom filter) / internal pipeline calls
	 tableState: smart table state internal object
	 originalDataColl: unfiltered client data
	 customFilter: filter data object used by addCustomFilter callback
	 callback: pass filtered data to it
	 */
	processPipe(options) {
		if (options.tableState) {
			options.customState.tableState = options.tableState;
		}
		if (options.customFilter) {
			options.customState.customFilter = options.customFilter;
		}
		let tableState = options.customState.tableState;
		let customFilter = options.customState.customFilter;

		let pagination = tableState.pagination, output, filtered = [];
		options.addCustomFilter(customFilter, tableState.search.predicateObject ? this.$filter("filter")(options.originalDataColl, tableState.search.predicateObject) : options.originalDataColl, filtered);
		if (tableState.sort.predicate) {
			filtered = this.$filter("orderBy")(filtered, tableState.sort.predicate, tableState.sort.reverse);
		}

		pagination.totalItemCount = filtered.length;
		if (pagination.number !== undefined) {
			pagination.numberOfPages = filtered.length > 0 ? Math.ceil(filtered.length / pagination.number) : 1;
			pagination.start = pagination.start >= filtered.length ? (pagination.numberOfPages - 1) * pagination.number : pagination.start;
			output = filtered.slice(pagination.start, pagination.start + parseInt(pagination.number));
		}
		return options.callback(output || filtered);
	}
}

export default SmartTableCustomizerService;