import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

// npx hardhat clean && npx hardhat compile

describe("Demo", function () {
  // We define a fixture to reuse the same setup in every test. We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Demo = await ethers.getContractFactory("Demo");
    const demo = await Demo.deploy();

    return { demo, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should get number", async function () {
      const { demo } = await loadFixture(deployOneYearLockFixture);

      // func to set the number in sc
      const setNum = await demo.setNum(21);
      await setNum.wait();

      expect(await demo.getNumber()).to.equal(21);
    });

    it("Should set the right owner", async function () {
      const { demo, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await demo.owner()).to.equal(owner.address);
    });
  })
})   

