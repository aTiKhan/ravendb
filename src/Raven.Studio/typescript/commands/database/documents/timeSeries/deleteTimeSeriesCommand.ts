import commandBase = require("commands/commandBase");
import endpoints = require("endpoints");
import database = require("models/resources/database");

class deleteTimeSeriesCommand extends commandBase {
    constructor(private documentId: string, private dtos: Raven.Client.Documents.Operations.TimeSeries.TimeSeriesOperation.RemoveOperation[], private db: database) {
        super();
    }
    
    execute(): JQueryPromise<void> {
        const url = endpoints.databases.timeSeries.timeseries;

        const operation = {
            DocumentId: this.documentId,
            Removals: this.dtos
        } as Raven.Client.Documents.Operations.TimeSeries.TimeSeriesOperation;

        const payload = {
            Documents: [operation]
        } as Raven.Client.Documents.Operations.TimeSeries.TimeSeriesBatch;

        return this.post(url, JSON.stringify(payload), this.db, { dataType: undefined })
            .fail((response: JQueryXHR) => this.reportError("Failed to delete time series.", response.responseText, response.statusText));
    }
}

export = deleteTimeSeriesCommand;