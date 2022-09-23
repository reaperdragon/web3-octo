const { ethers } = require("hardhat");
const expect = require("chai").expect;

describe("Blog App", async function () {
  it("Should create a blog", async function () {
    const contractFactory = await ethers.getContractFactory("BlogApp");
    const contractDeploy = await contractFactory.deploy("Mirror Blog App");

    await contractDeploy.deployed();

    await contractDeploy.createblog(
      "Image Cover hash",
      "Ethereum",
      "Ethereum Merge",
      "blockchain",
      "23 Jun"
    );

    let blogId = await contractDeploy.getblog(1);

    expect(blogId.blogtitle).to.equal("Ethereum");
  });

  it("Should update a blog", async function () {
    const contractFactory = await ethers.getContractFactory("BlogApp");
    const contractDeploy = await contractFactory.deploy("Mirror Blog App");

    await contractDeploy.deployed();

    await contractDeploy.createblog(
      "Image Cover hash",
      "Ethereum",
      "Ethereum Merge",
      "blockchain",
      "23 Jun"
    );

    await contractDeploy.updateblog(
      1,
      "updated cover hash",
      "Ethereum Merge",
      "Merge Successful",
      "blockchain"
    );

    let blogId = await contractDeploy.getblog(1);

    expect(blogId.blogtitle).to.equal("Ethereum Merge");
  });
    
});
