class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedObj = ["page", "sort", "limit", "fields"];
    excludedObj.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    //operators => gte, gt, lte, lt
    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );

    this.query.find(queryStr);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query.sort(sortBy);
    } else {
      this.query.sort("-created_At");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query.skip(skip).limit(limit);

    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const selectedFields = this.queryString.fields.split(",").join(" ");
      this.query.select(selectedFields);
    } else {
      this.query.select("-__v");
    }

    return this;
  }

  async totalCountDocuments() {
    try {
      // Clone the query to avoid modifying the original query
      const clonedQuery = this.query.model.find({ ...this.query.getQuery() });

      // Count the documents
      const totalDocuments = await clonedQuery.countDocuments();
      return totalDocuments;
    } catch (error) {
      throw new Error(`Error counting documents: ${error}`);
    }
  }
}

module.exports = APIFeatures;
