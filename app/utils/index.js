function returnDate() {
  // Parse payload
  return {
    created_at: new Date,
    updated_at: new Date
  };
}

function updateDate() {
  // Parse payload
  return {
    updated_at: new Date
  };
}

module.exports = {
  returnDate: returnDate,
  updateDate: updateDate
};
