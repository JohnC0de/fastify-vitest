import fastify from "fastify"
import fastifyCookie from "@fastify/cookie"

const server = fastify()

server.register(fastifyCookie, {
  secret: "cookiesTesting"
})

server.get("/getcookies", request => {
  // get cookies from request and return them
  return request.cookies
})

if (import.meta.vitest) {
  it("should get cookies", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/getcookies",
      cookies: {
        cookie1: "value1",
        cookie2: "value2"
      }
    })

    expect(res.statusCode).toBe(200)
    expect(res.json()).toEqual({ cookie1: "value1", cookie2: "value2" })
  })
}

server.get("/setcookies", (request, reply) => {
  // set cookies to reply and log them
  reply.setCookie("cookie1", "value1")
  reply.setCookie("cookie2", "value2")

  return { hello: "world" }
})

if (import.meta.vitest) {
  it("should set cookies", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/setcookies"
    })

    expect(res.statusCode).toBe(200)
    expect(res.json()).toEqual({ hello: "world" })
    expect(res.cookies).toEqual([
      {
        name: "cookie1",
        value: "value1"
      },
      {
        name: "cookie2",
        value: "value2"
      }
    ])
  })
}

if (import.meta.env.PROD) {
  server.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    console.log(`server listening on ${address}`)
  })
}

export const viteNodeApp = server
