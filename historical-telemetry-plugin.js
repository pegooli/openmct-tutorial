/**
 * A basic historical telemetry plugin.
 */
function HistoricalTelemetryPlugin() {
	return function install(openmct) {
		var provider = {
			supportsRequest: function(domainObject) {
				return domainObject.type === 'example.telemetry';
			},
			request: function(domainObject, options) {
				var url = 'http://localhost:8081/telemetry/' +
					domainObject.identifier.key +
					'?start=' + options.start +
					'&end=' + options.end;
				
				return http.get(url).then(function(result) {
					return result.data;
				});
			}
		};
		
		openmct.telemetry.addProvider(provider);
	}
}