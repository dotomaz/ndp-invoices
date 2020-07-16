import {add, differenceInSeconds, formatISO, parseISO} from 'date-fns';

export const getAccessToken = (): string | null => {
    const accessToken = sessionStorage.getItem('accessToken');
    const accessTokenExpire = sessionStorage.getItem('accessTokenExpireDate');

    if (accessToken){
        if (accessTokenExpire){
            const date = parseISO(accessTokenExpire);

            if (differenceInSeconds(date, new Date()) > 0) {
                return accessToken;
            }
        }
    }

    return null;
}

export const setAccessToken = (accessToken: string, expiresIn: number) => {
    sessionStorage.setItem('accessToken', accessToken);
    const accessTokenExpire = add(new Date(), { seconds: expiresIn});
    sessionStorage.setItem('accessTokenExpireDate', formatISO(accessTokenExpire));
}