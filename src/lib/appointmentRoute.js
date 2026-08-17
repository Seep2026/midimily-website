const supportedServiceTypes = new Set(['enterprise', 'individual']);

export function getAppointmentServiceType(search = '') {
  const serviceType = new URLSearchParams(search).get('service');
  return supportedServiceTypes.has(serviceType) ? serviceType : 'enterprise';
}
