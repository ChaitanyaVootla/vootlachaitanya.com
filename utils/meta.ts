export const metadata = {
    experience: calculateExperience('jun 1 2016'),
}

function calculateExperience(startDate: number | string | Date) {
    const start = new Date(startDate);
    const now = new Date();
  
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    const yearsStr = years > 0 ? `${years} years` : '';
    const monthsStr = months > 0 ? `${months} months` : '';
  
    return [yearsStr, monthsStr].filter(Boolean).join(', ');
}
