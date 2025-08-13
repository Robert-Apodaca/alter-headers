export default {
    async fetch(request): Promise<Response> {
        const response = await fetch(request);
        const newResponse = new Response(response.body, response);

        // Extract the hostname from the request
        const hostname = new URL(request.url).hostname;

        // Match and transform hostname to corresponding tech domain
        if (hostname.endsWith("-cst.circasports.com")) {
            const subdomain = hostname.split("-cst.circasports.com")[0];
            const mappedDomain = `${subdomain}.circasports-tech.com`;

            // Set the custom header
            newResponse.headers.set("Host", mappedDomain);
        }

        // Add a custom header
        // newResponse.headers.append("x-workers-hello", "Hello from Cloudflare Workers");

        // Delete headers
        // newResponse.headers.delete("x-header-to-delete");
        // newResponse.headers.delete("x-header2-to-delete");

        // Adjust the value for an existing header
        //newResponse.headers.set("x-header-to-change", "NewValue");

        return newResponse;
    },
} satisfies ExportedHandler;
