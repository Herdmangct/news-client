export const API_URL = "http://localhost:3000/results/";

export const intervalStringToInterval = {
  intervalMapping: { "1 day": "1d", "12 hours": "12h" },
  getInterval(interval) {
    return this.intervalMapping[interval];
  }
};

export const formatIntervalForTitle = {
  intervalToTitle: { "1 day": "Daily", "12 hours": "Twice daily" },
  getIntervalForTitle(interval) {
    return this.intervalToTitle[interval];
  }
};

export const getDateForTitle = date => {
  date = new Date(date);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
};

export const formatAPIDataIntoChartData = apiData => {
  /**
   * convert the responsedate from the rails server into graphable data
   */
  const { buckets } = apiData.data.aggregations[2];

  const info = [];
  buckets.forEach(timePeriod => {
    const entry = {};
    entry["date"] = timePeriod.key_as_string;

    timePeriod[3].buckets.forEach(informationMedium => {
      // Convert magazine entries into print entries
      const mediumTittle =
        informationMedium.key === "Magazine" ? "Print" : informationMedium.key;
      const documentCount = informationMedium.doc_count;

      entry[mediumTittle] = documentCount;
    });

    info.push(entry);
  });

  return info;
};
