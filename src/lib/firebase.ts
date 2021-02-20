//@ts-nocheck
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: "aiyeola-dev",
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') ,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       project_id: "aiyeola-dev",
//       private_key:
//         "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCZtGLDWdZ6FL+x\nIuQtkZF3bbNzu9Ng3bsV365UB9RrJPrdf0S6picP0jzMMcmfACx9eWhTWikzmywA\n4h/whA1leP0F7a0JilvK4pxwQpJYgMJxVYP8q+KU4sdeQQmP5sZfe1UikrxC5T5I\nj6F/6Pjb33JiHc51DOEKD5jhbvmnhXvIzFCZ6Ilubx2OUZXX6Z1R9m/k5T/UEAqg\n/vUiEtKyROy41OMovzw8J+WQ0rfu0BoWnMs5D91jpfm2twINMTctj5AqEsavQ+W/\nK/E4/6ceTZoiYoWDms6ipo3T7OiT/8cYtO2ydIs9X8/beLXEyHyJW8nkm+v5bHKi\nSbzJxljzAgMBAAECggEAFrmSTpKmQLd3nf9sIAahLLil6wsOlghCZFoFYrwjnlHB\n22S5KyVsqgyp24DS7/StH0IHeCdg5xXenCTSlxNXDbUlJ667wijYKHd3rKtTCs3C\nsdH0aTOalOuwkVFpUgLLOou4CxwJxJQzMLQ3qvstbAit1y7T+v9T+FJVBqOLOsap\nXavpZ5VjWWXHo3qMam7M7kO4+KoBmNULbPkKbAa+vKRaGjXpS6VNLJjXnJU1hyCK\nht+cUjTeRXrC5aftr+Q6eyM9lL1LdzkmIWrMTM0xrgg9V5S6gS6MxMZfFPQ3zRjv\nzETZ92n6Qm148LE3XKl46gXzpFxTi0pvvVir97QxuQKBgQDHsi/K5hL+u8s0nN88\n5jvEsjyUWSio0fkrI+aJ8rZ/P5LfS8okMm12uOvWOyTWoVY8j3EUuTxfmgc637QG\n1c+xrz0rNGHAlROebw6VjcCXjyrLGYfxeHa1kO5XWudyTrV25pt4GVHsuuodzhB6\nW/2gPqtE+eFyqFQyCSuZ4hprCQKBgQDFCpiVaNUOBp0r+lvM6qwG25qLEowP31EB\nEYabiFBFdiC4iSPArZGD8KQO39KgvFIgBF+IARvvwXtVDhOGTD32iVVSPc8jOvJh\nKdwiOnwDVW+hFMR9FiuJXD9o1aSmrXkAM+D+K9KPmQsDfR8ZXrRIRZgMsjCP6pIx\n1bp1D/VXGwKBgQC7WWvHMpUNkcfyQ16Y9vOJ9SIql38y61OV6qeGMkSPG2jCv4sU\n7I6P/KudoH1OM60BQh34MFT46DvyOx/d7cheTibYGtu+3t26HT0UiBnw1utyAjDt\nFXRhoWhKYkmTj05mD7I6OZ8HttCgR8xjz1wic8kg/EJL3KqpCrtyMpNQaQKBgQCM\nwu8R/VwGsw7g9e9SymquU39pzowkYqJZow2IWq8NkD/71GyoHtaPbP+maJrtnNsG\naFlerXwpoQzcTDwCesDhOGatY95wCpJQezj5ctJZB1XBuzZLLeVYMYBTAhynvdFt\nJaKbsO6xCuHlUiM/WnpsDtt6ZmluxmI+G7MiIY5g9QKBgHZEYDvat0q/DWOINwCN\nsN9JDgyQ81tj7gcVxqU7IBXF5rkUYp8B9adikzkzWTMQouAR6GwpmrRGsYjM4UF2\nCugnGajcvjR0iNMepNGX8Ula9C2OMCjrX5WPwoe/5wndm+bYNHgTZ29IP3x+U18Y\nQ7mSsKZyJ2bgMak+yUrjnJf5\n-----END PRIVATE KEY-----\n",
//       client_email:
//         "firebase-adminsdk-7uqda@aiyeola-dev.iam.gserviceaccount.com",
//     }),
//     databaseURL: "https://aiyeola-dev-default-rtdb.firebaseio.com",
//   });
// }

export default admin.database();
