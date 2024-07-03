export const users = [
    {
      "id": 1,
      "name": "Kapil",
      "email": "Kapil@gmail.com",
      "password": "1234",
      "role": "USER",
      "subscriptionId": null,
      "isEmailVerified": false,
      "failedLoginAttempts": 0,
      "isAccountLocked": false,
      "createdAt": "2024-06-29T00:00:00.000Z",
      "updatedAt": "2024-06-29T00:00:00.000Z",
      "Profile": null,
      "Token": [],
      "Proposals": [],
      "PromoCodeUses": [],
      "subscriptionTransactions": []
    }
  ];

  export const profiles = [
    {
      "id": 1,
      "userId": 1,
      "firstName": "John",
      "lastName": "Doe",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    }
  ];

  
  export const tokens = [
    {
      "id": 1,
      "userId": 1,
      "token": "randomtokenstring",
      "createdAt": "2024-06-29T00:00:00.000Z",
      "expiresAt": "2024-07-29T00:00:00.000Z",
      "isBlacklisted": false,
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    }
  ];

  
  export const subscriptions = [
    {
      "id": 1,
      "name": "Premium Plan",
      "details": "Access to all features",
      "duration": 12,
      "cost": 99.99,
      "users": [],
      "transactions": []
    }
  ];

  
  export const subscriptionTransactions = [
    {
      "id": 1,
      "userId": 1,
      "subscriptionId": 1,
      "amount": 99.99,
      "transactionDate": "2024-06-29T00:00:00.000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "subscription": {
        "id": 1,
        "name": "Premium Plan"
      }
    }
  ];

  
  export const sampleProposals = [
    {
      "id": 1,
      "name": "Sample Proposal 1",
      "image": "imageurl.jpg",
      "pdf": "documenturl.pdf",
      "details": "Details about the sample proposal",
      "proposals": []
    }
  ];

  
  export const proposals = [
    {
      "id": 1,
      "name": "Proposal 1",
      "description": "Description of the proposal",
      "sampleProposalId": 1,
      "sampleProposal": {
        "id": 1,
        "name": "Sample Proposal 1"
      },
      "userId": 1,
      "createdBy": "John Doe",
      "createdAt": "2024-06-29T00:00:00.000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    }
  ];

  
  export const grants = [
    {
      "id": 1,
      "name": "Grant 1",
      "image": "grantimage.jpg",
      "description": "Description of the grant",
      "summary": "Summary of the grant",
      "category": "Education",
      "amount": 5000,
      "link": "grantlink.com",
      "deadline": "2024-12-31T00:00:00.000Z",
      "county": "County 1",
      "city": "City 1",
      "state": "State 1"
    }
  ];

  export const promoCodes = [
    {
      "id": 1,
      "discount": 20,
      "uses": 10,
      "name": "SUMMER20",
      "details": "20% off summer promotion",
      "code": "SUMMER20",
      "promoCodeUses": []
    }
  ];

  
  export const offers = [
    {
      "id": 1,
      "discount": 15,
      "duration": 30,
      "name": "Winter Offer",
      "image": "offerimage.jpg",
      "description": "15% off winter offer",
      "code": "WINTER15"
    }
  ];

  
  export const promoCodeUses = [
    {
      "id": 1,
      "userId": 1,
      "promoCodeId": 1,
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "promoCode": {
        "id": 1,
        "code": "SUMMER20"
      }
    }
  ];

  
  export const banners = [
    {
      "id": 1,
      "url": "bannerurl.com",
      "navigateTo": "navigatehere.com"
    }
  ];

  
  export const logs = [
    {
      "id": 1,
      "userId": 1,
      "message": "User logged in",
      "logType": "INFO"
    }
  ];
  