import { Carrier, Coverage, State, Type } from "../../src/server/db";

const seedTypes = async () =>
  Type.bulkCreate([
    { name: "Fire" },
    { name: "Flood" },
    { name: "Auto" },
    { name: "SFR" },
    { name: "SFR4" }
  ]);

const seedStates = async () =>
  State.bulkCreate([
    { name: "IL" },
    { name: "IN" },
    { name: "MI" },
    { name: "FL" }
  ]);

const seedCarriers = async () =>
  Carrier.bulkCreate([
    { name: "Allstate" },
    { name: "Arcana" },
    { name: "ASI" },
    { name: "Auto Owners" },
    { name: "Bristol West (High Risk Auto)" },
    { name: "Chubb" },
    { name: "Encompass" },
    { name: "Foremost" },
    { name: "Founders" },
    { name: "Guard" },
    { name: "Hippo" },
    { name: "Lemonade" },
    { name: "National General" },
    { name: "Nationwide" },
    { name: "Openly" },
    { name: "Progressive" },
    { name: "SafeCo" },
    { name: "Secura" },
    { name: "State Auto" },
    { name: "Swyfft" },
    { name: "Travelers" },
    { name: "Universal Property" }
  ]);

export const up = async () => {
  const carrier = await seedCarriers();
  const types = await seedTypes();
  const state = await seedStates();

  await Coverage.bulkCreate([
    {
      stateId: state[0].id,
      typeId: types[0].id,
      carrierId: carrier[0].id
    },
    {
      stateId: state[0].id,
      typeId: types[2].id,
      carrierId: carrier[0].id
    },
    {
      stateId: state[2].id,
      typeId: types[0].id,
      carrierId: carrier[0].id
    },
    {
      stateId: state[2].id,
      typeId: types[1].id,
      carrierId: carrier[0].id
    },
    {
      stateId: state[1].id,
      typeId: types[0].id,
      carrierId: carrier[13].id
    },
    {
      stateId: state[1].id,
      typeId: types[1].id,
      carrierId: carrier[13].id
    },
    {
      stateId: state[1].id,
      typeId: types[3].id,
      carrierId: carrier[1].id
    },
    {
      stateId: state[2].id,
      typeId: types[3].id,
      carrierId: carrier[1].id
    }
  ]).then((coverage: any) => coverage);
};
