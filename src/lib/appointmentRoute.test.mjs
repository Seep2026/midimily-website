import assert from 'node:assert/strict';
import test from 'node:test';
import { getAppointmentServiceType } from './appointmentRoute.js';

test('keeps the individual appointment choice in the home-page link', () => {
  assert.equal(getAppointmentServiceType('?service=individual'), 'individual');
});

test('uses enterprise as the safe default for missing or unsupported choices', () => {
  assert.equal(getAppointmentServiceType(''), 'enterprise');
  assert.equal(getAppointmentServiceType('?service=other'), 'enterprise');
});
