from google.cloud import firestore

db = firestore.Client()

def request_loan(user_id, goal_id, loan_amount):
    user_ref = db.collection('users').document(user_id)
    user = user_ref.get().to_dict()
    locked_saving = user.get('dailySavingAmount', 0)

    # 1. Check if user's locked savings are enough
    if locked_saving >= loan_amount:
        # No need to borrow from others
        db.collection('loans').add({
            'userId': user_id,
            'goalId': goal_id,
            'amount': loan_amount,
            'source': 'self',
            'status': 'approved',
            'repayment_percent': 20,
            'createdAt': firestore.SERVER_TIMESTAMP
        })
        return {'status': 'approved', 'source': 'self', 'amount': loan_amount}

    # 2. Borrow from others' unused savings
    remaining = loan_amount - locked_saving
    # Find other users with unused savings
    users_snap = db.collection('users').where('dailySavingAmount', '>', 0).stream()
    borrowed = 0
    lenders = []
    for u in users_snap:
        if u.id == user_id:
            continue
        udata = u.to_dict()
        unused = udata.get('unusedSaving', 0)
        if unused > 0:
            take = min(unused, remaining - borrowed)
            if take > 0:
                lenders.append({'lenderId': u.id, 'amount': take})
                borrowed += take
            if borrowed >= remaining:
                break

    if borrowed + locked_saving < loan_amount:
        return {'status': 'failed', 'reason': 'Not enough unused savings in the system.'}

    # Record the loan
    db.collection('loans').add({
        'userId': user_id,
        'goalId': goal_id,
        'amount': loan_amount,
        'source': 'pooled',
        'lenders': lenders,
        'status': 'approved',
        'repayment_percent': 20,
        'createdAt': firestore.SERVER_TIMESTAMP
    })
    return {'status': 'approved', 'source': 'pooled', 'amount': loan_amount, 'lenders': lenders}
