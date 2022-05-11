import * as request from 'supertest'
import { app } from '../src/app'

import {
  invalidBondGeneralDigitChecker,
  invalidBondsDigitCheckerGroup1,
  invalidBondsDigitCheckerGroup2,
  invalidBondsDigitCheckerGroup3,
  invalidCovenantDigitCheckerGroup1Module10,
  invalidCovenantDigitCheckerGroup1Module11,
  invalidCovenantDigitCheckerGroup2Module10,
  invalidCovenantDigitCheckerGroup2Module11,
  invalidCovenantDigitCheckerGroup3Module10,
  invalidCovenantDigitCheckerGroup3Module11,
  invalidCovenantDigitCheckerGroup4Module10,
  invalidCovenantDigitCheckerGroup4Module11,
  invalidCovenantEffectiveValue,
  invalidCovenantGeneralDigitCheckerModule10,
  invalidCovenantSegment,
  invalidDigitableLineCharacter,
  invalidDigitableLineCharacterWithSpace,
  invalidLenghDigitableLine,
  validBondsDigitableLine,
  validCovenantDigitableLine,
  validCovenantDigitableWithDateLine
} from './Constants/BankslipConstants'

describe('GET /boleto', () => {
  it('should be able to generate info from a 47 digit bankslip digitable line', async () => {
    const response = await request(app).get(`/boleto/${validBondsDigitableLine}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      barCode: '23797404300001240200448056168623793601105800',
      amount: 1240.2,
      expirationDate: '2008-11-01T00:00:00.000Z'
    })
  })

  it('should be able to generate info from a 48 digit bankslip digitable line', async () => {
    const response = await request(app).get(`/boleto/${validCovenantDigitableLine}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      barCode: '84670000001435900240200240500024384221010811',
      amount: 143.59,
      expirationDate: null
    })
  })

  it('should be able to generate info from a 48 digit bankslip digitable line THAT contains expiration date info', async () => {
    const response = await request(app).get(`/boleto/${validCovenantDigitableWithDateLine}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      barCode: '84680000001435900240200202202024384221010811',
      amount: 143.59,
      expirationDate: '2022-02-02T03:00:00.000Z'
    })
  })

  it('should NOT be able to generate info from a digitable line with invalid characters', async () => {
    const response = await request(app).get(`/boleto/${invalidDigitableLineCharacter}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.digitableLineHasInvalidCharacterError',
      message: 'Digitable line has an invalid character.',
      details: []
    })
  })

  it('should NOT be able to generate info from a digitable line with space in the characters', async () => {
    const response = await request(app).get(`/boleto/${invalidDigitableLineCharacterWithSpace}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.digitableLineHasInvalidCharacterError',
      message: 'Digitable line has an invalid character.',
      details: []
    })
  })

  it('should NOT be able to generate info from a digitable line with invalid lenght', async () => {
    const response = await request(app).get(`/boleto/${invalidLenghDigitableLine}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.digitableLineHasInvalidLengthError',
      message: 'Digitable line must have 47 or 48 characters.',
      details: []
    })
  })

  it('should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the first group THAT uses module 10 calculation method', async () => {
    const response = await request(app).get(`/boleto/${invalidCovenantDigitCheckerGroup1Module10}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.covenantBankslipInvalidGroupDVError',
      message: 'Invalid covenant bankslip DV in group 1.',
      details: []
    })
  })

  it('should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the second group THAT uses module 10 calculation method', async () => {
    const response = await request(app).get(`/boleto/${invalidCovenantDigitCheckerGroup2Module10}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.covenantBankslipInvalidGroupDVError',
      message: 'Invalid covenant bankslip DV in group 2.',
      details: []
    })
  })

  it('should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the third group THAT uses module 10 calculation method', async () => {
    const response = await request(app).get(`/boleto/${invalidCovenantDigitCheckerGroup3Module10}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.covenantBankslipInvalidGroupDVError',
      message: 'Invalid covenant bankslip DV in group 3.',
      details: []
    })
  })

  it('should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the fourth group THAT uses module 10 calculation method', async () => {
    const response = await request(app).get(`/boleto/${invalidCovenantDigitCheckerGroup4Module10}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.covenantBankslipInvalidGroupDVError',
      message: 'Invalid covenant bankslip DV in group 4.',
      details: []
    })
  })

  it('should NOT be able to generate info from a covenant bankslip digitable line with invalid general digit checker THAT uses module 10 calculation method', async () => {
    const response = await request(app).get(`/boleto/${invalidCovenantGeneralDigitCheckerModule10}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.covenantBankslipInvalidGeneralDVError',
      message: 'Invalid covenant bankslip general DV.',
      details: []
    })
  })

  it('should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the first group THAT uses module 11 calculation method', async () => {
    const response = await request(app).get(`/boleto/${invalidCovenantDigitCheckerGroup1Module11}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.covenantBankslipInvalidGroupDVError',
      message: 'Invalid covenant bankslip DV in group 1.',
      details: []
    })
  })

  it('should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the second group THAT uses module 11 calculation method', async () => {
    const response = await request(app).get(`/boleto/${invalidCovenantDigitCheckerGroup2Module11}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.covenantBankslipInvalidGroupDVError',
      message: 'Invalid covenant bankslip DV in group 2.',
      details: []
    })
  })

  it('should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the third group THAT uses module 11 calculation method', async () => {
    const response = await request(app).get(`/boleto/${invalidCovenantDigitCheckerGroup3Module11}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.covenantBankslipInvalidGroupDVError',
      message: 'Invalid covenant bankslip DV in group 3.',
      details: []
    })
  })

  it('should NOT be able to generate info from a covenant bankslip digitable line with invalid digit checker on the fourth group THAT uses module 11 calculation method', async () => {
    const response = await request(app).get(`/boleto/${invalidCovenantDigitCheckerGroup4Module11}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.covenantBankslipInvalidGroupDVError',
      message: 'Invalid covenant bankslip DV in group 4.',
      details: []
    })
  })

  it('should NOT be able to generate info from a covenant bankslip with invalid segment', async () => {
    const response = await request(app).get(`/boleto/${invalidCovenantSegment}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.covenantBankslipInvalidSegmentError',
      message: 'Covenant bankslip invalid segment.',
      details: [
        {
          id: 'invalid.segment',
          message: 'Segment must be either 1,2,3,4,5,6,7,9.',
          enum: ['1', '2', '3', '4', '5', '6', '7', '9']
        }
      ]
    })
  })

  it('should NOT be able to generate info from a covenant bankslip with invalid effective value', async () => {
    const response = await request(app).get(`/boleto/${invalidCovenantEffectiveValue}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.covenantBankslipInvalidEffectiveValueError',
      message: 'Covenant bankslip invalid effective value.',
      details: [
        {
          id: 'invalid.effective.value',
          message: 'Effective value must be either 6,7,8,9.',
          enum: ['6', '7', '8', '9']
        }
      ]
    })
  })

  it('should NOT be able to generate info from a bonds bankslip digitable line with invalid digit checker on the first group', async () => {
    const response = await request(app).get(`/boleto/${invalidBondsDigitCheckerGroup1}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.bondsBankslipInvalidGroupDVError',
      message: 'Invalid bond bankslip DV in group 1.',
      details: []
    })
  })

  it('should NOT be able to generate info from a bonds bankslip digitable line with invalid digit checker on the second group', async () => {
    const response = await request(app).get(`/boleto/${invalidBondsDigitCheckerGroup2}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.bondsBankslipInvalidGroupDVError',
      message: 'Invalid bond bankslip DV in group 2.',
      details: []
    })
  })

  it('should NOT be able to generate info from a bonds bankslip digitable line with invalid digit checker on the third group', async () => {
    const response = await request(app).get(`/boleto/${invalidBondsDigitCheckerGroup3}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.bondsBankslipInvalidGroupDVError',
      message: 'Invalid bond bankslip DV in group 3.',
      details: []
    })
  })

  it('should NOT be able to generate info from a bonds bankslip digitable line with invalid general digit checker', async () => {
    const response = await request(app).get(`/boleto/${invalidBondGeneralDigitChecker}`)

    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      code: '422.bondsBankslipInvalidGeneralDVError',
      message: 'Invalid bond bankslip general DV.',
      details: []
    })
  })
})
