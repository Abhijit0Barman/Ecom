class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //case in-Sensitive check both upper/lower case
          },
        }
      : {};
    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((el) => delete queryCopy[el]);
    console.log("queryCopy ->", queryCopy);

    // Filter for Price and Rating
    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    console.log("queryString->", queryString);
    return this;
  }

  pagination(resultPerPage) {
    // const page = this.queryStr.page * 1 || 1;  // by multiplying 1 we converting string to number
    // const limit = this.queryStr.limit * 1 || resultPerPage;
    // const skip = (page - 1) * limit;

    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
