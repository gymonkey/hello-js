exports.pageQuery = async function ({
  page = 1,
  pageSize = 15,
  sortParams = '-createdAt',
  Model,
  populates = [],
  queryParams,
  picks
}) {
  page = +page
  pageSize = +pageSize

  const startCursor = (page - 1) * pageSize

  const query = Model
    .find(queryParams)
    .sort(sortParams)
    .skip(startCursor)
    .limit(pageSize)

  for (let populate of populates) {
    query.populate(populate)
  }

  if (picks) {
    query.select(picks)
  }

  const count = Model.countDocuments(queryParams)

  const [data, total] = await Promise.all([query, count])

  return {
    total,
    page,
    pageSize,
    data
  }
}

exports.transform = function transform (doc, ret) {
  ret.id = ret._id.toString()
  delete ret._id
  return ret
}
