function dateStrToObj(dateStr: string) {
  const [year, month, date] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, date);
}

function dateValidation(startDateStr: string, endDateStr: string) {
  if (!startDateStr || !startDateStr) return;

  const startDate = dateStrToObj(startDateStr);
  const endDate = dateStrToObj(endDateStr);
  if (endDate.valueOf() < startDate.valueOf()) {
    return false;
  }
  return true;
}

export default dateValidation;
