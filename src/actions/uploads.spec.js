import * as actions from './index'

describe('upload actions', () => {
    it('uploadsFetchBegin should create UPLOADS_FETCH_BEGIN action', () => {
        expect(actions.uploadsFetchBegin()).toEqual({
            type: actions.UPLOADS_FETCH_BEGIN,
        })
    });
});