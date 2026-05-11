db = db.getSiblingDB('open5gs');

// Reset DB
db.subscribers.deleteMany({});

db.subscribers.insertMany([

{
    imsi: "001011234567895",
    imeisv: "4370816125816151",
    security: {
        k: "8baf473f2f8fd09487cccbd7097c6862",
        op: "11111111111111111111111111111111",
        amf: "8000",
        sqn: NumberLong(641)
    },
    ambr: {                            // <-- AMBR UE
        downlink: { value: 1, unit: 3 },
        uplink:   { value: 1, unit: 3 }
    },
    slice: [
        {
            sst: 1,
            #sd: "000001",
            default_indicator: true,
            session: [
                {
                    name: "internet",
                    type: 3,
                    ambr: {                 // <-- AMBR session
                        downlink: { value: 1, unit: 3 },
                        uplink:   { value: 1, unit: 3 }
                    },
                    qos: {
                        index: 9,
                        arp: {
                            priority_level: 8,
                            pre_emption_capability: 1,
                            pre_emption_vulnerability: 1
                        }
                    }
                }
            ]
        }
    ]
},

{
    imsi: "001011234567899",
    imeisv: "4370816125816151",
    security: {
        k: "8baf473f2f8fd09487cccbd7097c6862",
        op: "11111111111111111111111111111111",
        amf: "8000",
        sqn: NumberLong(833)
    },
    ambr: {                            // <-- AMBR UE
        downlink: { value: 1, unit: 3 },
        uplink:   { value: 1, unit: 3 }
    },
    slice: [
        {
            sst: 1,
            #sd: "000002",
            default_indicator: true,
            session: [
                {
                    name: "internet",
                    type: 3,
                    ambr: {                 // <-- AMBR session
                        downlink: { value: 1, unit: 3 },
                        uplink:   { value: 1, unit: 3 }
                    },
                    qos: {
                        index: 9,
                        arp: {
                            priority_level: 8,
                            pre_emption_capability: 1,
                            pre_emption_vulnerability: 1
                        }
                    }
                }
            ]
        }
    ]
}

]);
