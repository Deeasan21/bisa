/**
 * Data export utilities — JSON and CSV download helpers.
 */

/**
 * Trigger a file download in the browser.
 */
function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export user data as a JSON file.
 */
export function downloadJSON(data, displayName) {
  const name = (displayName || 'bisa').replace(/\s+/g, '-').toLowerCase();
  const date = new Date().toISOString().split('T')[0];
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, `${name}-bisa-export-${date}.json`, 'application/json');
}

/**
 * Convert an array of objects to CSV string.
 */
function arrayToCSV(rows) {
  if (!rows || rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];
  for (const row of rows) {
    const values = headers.map(h => {
      let val = row[h];
      if (val === null || val === undefined) return '';
      if (typeof val === 'object') val = JSON.stringify(val);
      val = String(val);
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    });
    lines.push(values.join(','));
  }
  return lines.join('\n');
}

/**
 * Export user data as multiple CSV files bundled in a single download.
 * Each table becomes a separate section in one CSV, separated by headers.
 */
export function downloadCSV(data, displayName) {
  const name = (displayName || 'bisa').replace(/\s+/g, '-').toLowerCase();
  const date = new Date().toISOString().split('T')[0];

  const sections = [];
  for (const [key, value] of Object.entries(data)) {
    if (key === 'exportedAt' || key === 'version') continue;
    if (!Array.isArray(value) || value.length === 0) continue;
    sections.push(`--- ${key} ---`);
    sections.push(arrayToCSV(value));
    sections.push('');
  }

  if (sections.length === 0) {
    sections.push('No data to export');
  }

  const csv = sections.join('\n');
  downloadFile(csv, `${name}-bisa-export-${date}.csv`, 'text/csv');
}
