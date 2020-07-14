
const host = `https://localhost`;
const loginUrl = `${host}/api/auth/login`;
const refreshUrl = `${host}/api/auth/refresh`;

export interface JWTResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(request);
  
    try {
        response.parsedBody = await response.json();
    } catch (ex) {}
  
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
}

function  encodeFormData (data: {[key: string]: string}): string {
    let formBody = [];
    for (var property in data) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    
    return formBody.join("&");
}

export async function Login (email: string, password:string): Promise<JWTResponse | undefined> {
    let response = await http<JWTResponse>( new Request(
        loginUrl,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: encodeFormData({email, password})
        })
    );

    return response?.parsedBody;
}

