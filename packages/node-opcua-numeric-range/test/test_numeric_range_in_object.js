"use strict";
const should = require("should");

const NumericRange = require("..").NumericRange;

const factories = require("node-opcua-factory");
const generator = require("node-opcua-generator");

const encode_decode_round_trip_test = require("node-opcua-packet-analyzer/test_helpers/encode_decode_round_trip_test").encode_decode_round_trip_test;
const json_encode_decode_round_trip_test = require("node-opcua-packet-analyzer/test_helpers/encode_decode_round_trip_test").json_encode_decode_round_trip_test;

const path = require("path");
const temporary_folder = path.join(__dirname,"..","_test_generated");

const ObjWithNumericRange_Schema = {

    id: factories.next_available_id(),
    name: "ObjWithNumericRange",
    fields: [
        {name: "title", fieldType: "UAString"},
        {
            name: "numericRange",
            fieldType: "NumericRange"
        }
    ]
};
exports.ObjWithNumericRange_Schema = ObjWithNumericRange_Schema;


describe(" encoding / decoding", function () {
    let ObjWithNumericRange;

    function _encode_decode_test(prefix, encode_decode_round_trip_test) {
        it(prefix + "should persist an object with a numeric range - empty", function () {
            const o = new ObjWithNumericRange({});
            o.numericRange.type.should.equal(NumericRange.NumericRangeType.Empty);
            should(o.numericRange.isValid()).eql(true);
            should(o.numericRange.toEncodeableString()).eql(null);
            encode_decode_round_trip_test(o);
        });
        it(prefix + "should persist an object with a numeric range - value pair", function () {
            const o = new ObjWithNumericRange({
                numericRange: "2:3"
            });
            should(o.numericRange.isValid()).eql(true);
            o.numericRange.type.should.equal(NumericRange.NumericRangeType.ArrayRange);
            should(o.numericRange.toEncodeableString()).eql("2:3");
            encode_decode_round_trip_test(o);
        });
        it(prefix + "should persist an object with a numeric range - single value", function () {
            const o = new ObjWithNumericRange({
                numericRange: "100"
            });
            should(o.numericRange.isValid()).eql(true);
            o.numericRange.type.should.equal(NumericRange.NumericRangeType.SingleValue);
            should(o.numericRange.toEncodeableString()).eql("100");
            encode_decode_round_trip_test(o);
        });
        it(prefix + "should persist an object with a numeric range - Invalid", function () {
            const o = new ObjWithNumericRange({
                numericRange: "-4,-8"
            });
            should(o.numericRange.isValid()).eql(false);
            o.numericRange.type.should.equal(NumericRange.NumericRangeType.InvalidRange);
            should(o.numericRange.toEncodeableString()).eql("-4,-8");
            encode_decode_round_trip_test(o);
        });
        it(prefix + "should persist an object with a numeric range - MatrixRange - type 1", function () {
            const o = new ObjWithNumericRange({
                numericRange: "1:2,3:4"
            });
            o.numericRange.type.should.equal(NumericRange.NumericRangeType.MatrixRange);
            should(o.numericRange.isValid()).eql(true);
            should(o.numericRange.toEncodeableString()).eql("1:2,3:4");
            encode_decode_round_trip_test(o);
        });
        it(prefix + "should persist an object with a numeric range - MatrixRange - type 2", function () {
            const o = new ObjWithNumericRange({
                numericRange: "1,3"
            });
            o.numericRange.type.should.equal(NumericRange.NumericRangeType.MatrixRange);
            should(o.numericRange.isValid()).eql(true);
            should(o.numericRange.toEncodeableString()).eql("1,3");
            encode_decode_round_trip_test(o);
        });

    }


    before(function () {
        ObjWithNumericRange = generator.registerObject(ObjWithNumericRange_Schema, temporary_folder);
    });
    after(function () {
        generator.unregisterObject(ObjWithNumericRange_Schema,temporary_folder);
    });

    _encode_decode_test("binary : ", encode_decode_round_trip_test);
    _encode_decode_test("json : ", json_encode_decode_round_trip_test);


});
