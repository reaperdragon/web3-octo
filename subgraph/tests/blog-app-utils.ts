import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { BlogCreated, BlogUpdated } from "../generated/BlogApp/BlogApp"

export function createBlogCreatedEvent(
  blogId: BigInt,
  blogcoverhash: string,
  blogtitle: string,
  blogcontent: string,
  category: string,
  date: string,
  user: Address
): BlogCreated {
  let blogCreatedEvent = changetype<BlogCreated>(newMockEvent())

  blogCreatedEvent.parameters = new Array()

  blogCreatedEvent.parameters.push(
    new ethereum.EventParam("blogId", ethereum.Value.fromUnsignedBigInt(blogId))
  )
  blogCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "blogcoverhash",
      ethereum.Value.fromString(blogcoverhash)
    )
  )
  blogCreatedEvent.parameters.push(
    new ethereum.EventParam("blogtitle", ethereum.Value.fromString(blogtitle))
  )
  blogCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "blogcontent",
      ethereum.Value.fromString(blogcontent)
    )
  )
  blogCreatedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  blogCreatedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromString(date))
  )
  blogCreatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return blogCreatedEvent
}

export function createBlogUpdatedEvent(
  blogId: BigInt,
  blogcoverhash: string,
  blogtitle: string,
  blogcontent: string,
  category: string,
  date: string,
  user: Address
): BlogUpdated {
  let blogUpdatedEvent = changetype<BlogUpdated>(newMockEvent())

  blogUpdatedEvent.parameters = new Array()

  blogUpdatedEvent.parameters.push(
    new ethereum.EventParam("blogId", ethereum.Value.fromUnsignedBigInt(blogId))
  )
  blogUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "blogcoverhash",
      ethereum.Value.fromString(blogcoverhash)
    )
  )
  blogUpdatedEvent.parameters.push(
    new ethereum.EventParam("blogtitle", ethereum.Value.fromString(blogtitle))
  )
  blogUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "blogcontent",
      ethereum.Value.fromString(blogcontent)
    )
  )
  blogUpdatedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  blogUpdatedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromString(date))
  )
  blogUpdatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return blogUpdatedEvent
}
